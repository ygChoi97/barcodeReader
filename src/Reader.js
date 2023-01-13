import React from 'react';
import { useEffect, useRef, useState } from 'react';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';
const Reader = () => {
    const [localStream, setLocalStream] = useState();

    const [cameraDir, setCameraDir] = useState('environment');

    const Camera = useRef(null);
    const hints = new Map();
    const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX, BarcodeFormat.CODE_128, BarcodeFormat.CODABAR, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_39, BarcodeFormat.CODE_93];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    const Scan = new BrowserMultiFormatReader(hints, 500);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            //video: { facingMode: "user" }, //전면
            video: { width:{min:320, ideal:640, max:1280}, height:{min:180, ideal:360, max:720}, facingMode: { exact: cameraDir } }, //후면
        })
            .then(stream => {
            console.log(stream);
            setLocalStream(stream);
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
    const Scanning = async () => {
        // const t = await Scan.decodeOnce();
        console.log('scan');
        if (localStream && Camera.current) {
            try {
                const data = await Scan.decodeFromStream(localStream, Camera.current, (data, err) => {
                    if (data) {
                        setText(data.getText());
                        console.log(data.getText());
                        // Scan.stopContinuousDecode();
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
    const [text, setText] = useState('');

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