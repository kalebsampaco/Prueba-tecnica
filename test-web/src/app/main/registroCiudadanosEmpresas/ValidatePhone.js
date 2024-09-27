import CustomButton from '@components/CustomButton';
import { ExclamationIcon } from '@components/FuseSvgIcon';
import { makeStyles } from '@mui/styles';
import { showMessage } from 'app/store/fuse/messageSlice';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
    inputCode: {
        border: "1px solid #BDD7EF",
        outline: "none",
        width: 48,
        height: 56,
        borderRadius: 6
    },
    containInfo: {
        border: '1px solid #2E7EC5',
        color: '#2E7EC5',
        background: '#EEF7FF',
        padding: 16
    }
}));


function ValidatePhone(props) {
    const dispatch = useDispatch();
    const { setCodeEmpty, setForm, form } = props;
    const classes = useStyles();

    const [counter, setCounter] = useState(60);
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [text3, setText3] = useState("");
    const [text4, setText4] = useState("");
    const [stateImputsError, setStateImputsError] = useState({
        input1: false,
        input2: false,
        input3: false,
        input4: false,
    });
    const input1 = useRef(null);
    const input2 = useRef(null);
    const input3 = useRef(null);
    const input4 = useRef(null);

    const codeEmpty = text1 === '' && text2 === '' && text3 === '' || text4 === ''

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    useEffect(() => {
        if (codeEmpty) {
            setCodeEmpty(true)
        } else {
            setCodeEmpty(false)
        }
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [codeEmpty]);

    const onChangeText1 = (event) => {
        if (event.target.value.length > 0) {
            if (parseInt(event.target.value) >= 0) {
                setText1(event.target.value);
                input2.current.focus();
            }
            if (text2 !== '' && text3 !== '' && text4 !== '') {
                setForm({ ...form, code: `${event.target.value}${text2}${text3}${text4}` })
            }
            setStateImputsError({
                ...stateImputsError,
                input1: false,
                input2: false,
                input3: false,
                input4: false,
            });
        } else {
            setText1(event.target.value);
            setStateImputsError({
                ...stateImputsError,
                input1: true,
                input2: true,
                input3: true,
                input4: true,
            });
        }
    };

    const onChangeText2 = (event) => {
        if (event.target.value.length > 0) {
            if (parseInt(event.target.value) >= 0) {
                setText2(event.target.value);
                input3.current.focus();
                if (text1 !== '' && text3 !== '' && text4 !== '') {
                    setForm({ ...form, code: `${text1}${event.target.value}${text3}${text4}` })
                }
            }
        } else {
            setText2(event.target.value);
            input1.current.focus();
        }
    };

    const onChangeText3 = (event) => {
        if (event.target.value.length > 0) {
            if (parseInt(event.target.value) >= 0) {
                setText3(event.target.value);
                input4.current.focus();
                if (text1 !== '' && text2 !== '' && text4 !== '') {
                    setForm({ ...form, code: `${text1}${text2}${event.target.value}${text4}` })
                }
            }
        } else {
            setText3(event.target.value);
            input2.current.focus();
        }
    };
    const onChangeText4 = (event) => {
        if (event.target.value.length > 0) {
            if (parseInt(event.target.value) >= 0) {
                setText4(event.target.value);
                if (text1 !== '' && text2 !== '' && text3 !== '') {
                    setForm({ ...form, code: `${text1}${text2}${text3}${event.target.value}` })
                }
            }
        } else {
            setText4(event.target.value);
            input3.current.focus();
        }
    };

    const sendCode = async () => {
        const body = {
            celular: `57${form.phone}`,
            email: form.email,
        }
        // const result = await dispatch(sendCodeAgain(body))
        if (result && result.status == 'success') {
            dispatch(showMessage({ message: `${result.message}`, variant: 'success' }))
        }
    }

    return (
        <div className='flex flex-col items-center justify-center p-14'>
            <p className='font-bold text-primary text-16'>
                Estamos validando tu identidad
            </p>
            <p className='text-primaryBlack text-12 m-20 text-center'>
                Ingresa el código de 4 dígitos que hemos enviado al número de teléfono que acabas de ingresar
            </p>
            <div className='flex justify-around'>
                <input
                    type="text"
                    value={text1}
                    className={clsx(classes.inputCode, "mr-10 md:mr-16 text-center")}
                    maxLength={1}
                    onChange={onChangeText1}
                    ref={input1}
                    style={{ borderColor: stateImputsError.input1 ? "red" : "" }}
                />
                <input
                    type="text"
                    value={text2}
                    className={clsx(classes.inputCode, "mr-10 md:mr-16 text-center")}
                    maxLength={1}
                    onChange={onChangeText2}
                    ref={input2}
                    style={{ borderColor: stateImputsError.input2 ? "red" : "" }}
                />
                <input
                    type="text"
                    value={text3}
                    className={clsx(classes.inputCode, "mr-10 md:mr-16 text-center")}
                    maxLength={1}
                    onChange={onChangeText3}
                    ref={input3}
                    style={{ borderColor: stateImputsError.input3 ? "red" : "" }}
                />
                <input
                    type="text"
                    value={text4}
                    className={clsx(classes.inputCode, "mr-10 md:mr-16 text-center")}
                    maxLength={1}
                    onChange={onChangeText4}
                    ref={input4}
                    style={{ borderColor: stateImputsError.input4 ? "red" : "" }}
                />
            </div>
            <div className='text-primary font-bold mt-20'>
                {`Solicitar nuevo SMS ${counter === 0 ? "" : `en ${counter} seg`}`}
            </div>
            <div className='my-32 flex items-center'>
                <p className='text-primaryBlack font-600'>
                    ¿No has recibido el código?
                </p>
                <div className='max-w-96 ml-14'>
                    <CustomButton
                        className='secondary'
                        label='Reenviar'
                        height='medium'
                        disabled={counter === 0 ? false : true}
                        onClick={sendCode}
                    />
                </div>
            </div>
            <div className={clsx(classes.containInfo, 'flex items-center max-w-288 rounded-6')}>
                <ExclamationIcon
                    fill='#2E7EC5'
                    width='38'
                    height='38'
                />
                <p className='ml-10 text-12'>
                    Si deseas cambiar el número, puedes hacerlo dando clic al boton modificar datos
                </p>
            </div>
        </div>
    );
}

export default ValidatePhone;
