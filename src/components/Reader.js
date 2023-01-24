import React, { useContext } from 'react';
import { useEffect, useRef, useState } from 'react';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';
import beepScan from '../sounds/Barcode-scanner-beep-sound.mp3';
import PwsContext from './PWS-Context';
const Reader = () => {
    const [localStream, setLocalStream] = useState();
    const [cameraDir, setCameraDir] = useState('environment');
    const [text, setText] = useState('');
    const Camera = useRef(null);
    const scanSound = new Audio(beepScan);
    const hints = new Map();
    const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX, BarcodeFormat.CODE_128, BarcodeFormat.CODABAR, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_39, BarcodeFormat.CODE_93];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    const Scan = new BrowserMultiFormatReader(hints, 200);

    const { managementId, setManagementId } = useContext(PwsContext);
    const facingModeFlip = () => {
        if(cameraDir == 'environment') setCameraDir('user');
        if(cameraDir == 'user') setCameraDir('environment');
    }
    useEffect(() => {
        //setManagementId('H22N21044'); // 카메라 없는 환경 테스트
        navigator.mediaDevices.getUserMedia({
            video: { width:{min:160, ideal:320, max:640}, height:{min:90, ideal:180, max:360}, facingMode: { exact: cameraDir } },
        })
            .then(stream => {
                
                setLocalStream(stream);
        })
        .catch((err) => {
            if(err.name == 'OverconstrainedError' && err.constraint == 'facingMode')  {facingModeFlip();console.log('camera direction : ', cameraDir);}
        });
        return () => {
            Stop();
        };
    }, [cameraDir]);
    useEffect(() => {
        if (!Camera.current)
            return;
        if (localStream && Camera.current) {
            Scanning();
        }
        return () => {
            Stop();
        };
    }, [localStream]);
    const req = useRef();

    const isCodePWSFormat = function(str_code) {
        console.log(str_code);
        if(str_code.length != 9) {console.log('code length is not 9.');return false;}
        
        if(str_code.charAt(0) != 'H') {console.log(`index of 0 is not 'H'`);return false;}
        
        const ltxt = str_code.substr(1, 2);
        if(isNaN(ltxt)) {console.log('year code is not number');return false;}

        if(str_code.charAt(3) != 'N') {console.log(`index of 3 is not 'N'`);return false;}
        const rtxt = str_code.substr(4, 5);
        if(isNaN(rtxt)) {console.log('last 5 character is not number.');return false;}

        console.log(`It's PWS barcode type.`);
        return true;
    };

    const Scanning = async () => {
        // const t = await Scan.decodeOnce();
        console.log('scan');
        
        if (localStream && Camera.current) {
            try {
                const data = await Scan.decodeFromStream(localStream, Camera.current, (data, err) => {
                    if (data) {
                        if(isCodePWSFormat(data.getText())) {
                            //Scan.stopStreams();  // 카메라 스트림 중지
                            scanSound.loop = false;
                            scanSound.play();
                            
                            setText(data.getText());       
                            setManagementId(data.getText());    // 자산관리번호 바코드 스캔 결과 Context 에 저장
                            
                        }
                        else {
                            console.log('It is not PWS barcode.');
                        }          
                    }
                    else {
                        ; //setText("");
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    
    const Stop = () => {
        if (localStream) {
            const vidTrack = localStream.getVideoTracks();
            vidTrack.forEach(track => {
                localStream.removeTrack(track);
            });
        }
    };
    
    // 카메라아이콘 클릭 핸들러 (카메라 전환)
    const onToggleCemeraHandler = e => {
        if(cameraDir === 'environment') {
            console.log('user');
            setCameraDir('user');
        }
        else {
            console.log('environment');
            setCameraDir('environment');
        }
    };

    return (
        <div style={{border:'solid', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', margin:'20px 0px'}}>
                <video ref={Camera}id="video"/>
        
                <CameraswitchIcon color='primary' fontSize='large' style={{marginLeft:'30px'}} onClick={onToggleCemeraHandler}/>
            </div>
            <div style={{margin:'20px 0px'}}>
                <p>{text}</p>
            </div>
        </div>
        );
};
export default Reader;