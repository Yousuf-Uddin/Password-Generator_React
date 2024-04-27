import { useState } from 'react';
import './App.css';
import { Button, Row } from 'react-bootstrap';
import { LC, NC, SC, UC } from './Assets/Data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  let [uppercase, setUppercase] = useState(false);
  let [lowercase, setLowercase] = useState(false);
  let [number, setNumber] = useState(false);
  let [symbols, setSymbols] = useState(false);
  let [passlen, setPasslen] = useState(8);
  let [fpass, setFpass] = useState("");

  //->Generating Password Start//
  let getpass = () => {
    let charset = "";
    let finalpass = "";
    if (uppercase || lowercase || number || symbols) {
      if (uppercase) charset += UC;
      if (lowercase) charset += LC;
      if (number) charset += NC;
      if (symbols) charset += SC;
      for (let i = 0; i < passlen; i++) {
        finalpass += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      setFpass(finalpass);
    }
    else {
      toast.error('Select a CheckBox!!!');
    }
  };
  //->Generating Password End//

  //->Copy to ClipBoard logic Start//
  let copypass = () => {
    navigator.clipboard.writeText(fpass);
    toast.info("Copied to Clipboard.");
  };
  //->Copy to ClipBoard logic End//

  return (
    <div className='App'>
      <ToastContainer autoClose={3000} theme="dark" />
      <div className='App-header border border-danger rounded  '>
        <h2 className='text-light text-center m-3'>Password Generator</h2>
        <div className="d-flex m-3">
          <input type="text" readOnly value={fpass} className="form-control" />
          <div className='mx-3 PassBtn'>
            <Button className="btn-dark" onClick={copypass}><i className="bi bi-copy"></i></Button>
          </div>
        </div>
        <div className='mx-3 my-1 d-flex justify-content-between  '>
          <label>Password Length</label>
          <input type='number' max={20} min={8} value={passlen} onChange={(e) => setPasslen(e.target.value)} className='inputgrp' />
        </div>
        <div className='mx-3 my-1 d-flex justify-content-between font- '>
          <label>Include UpperCase Alphabets</label>
          <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} />
        </div>
        <div className='mx-3 my-1 d-flex justify-content-between '>
          <label>Include LowerCase Alphabets</label>
          <input type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} />
        </div>
        <div className='mx-3 my-1 d-flex justify-content-between '>
          <label>Include Numbers</label>
          <input type="checkbox" checked={number} onChange={() => setNumber(!number)} />
        </div>
        <div className='mx-3 my-1 d-flex justify-content-between '>
          <label>Include Symbols</label>
          <input type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols)} />
        </div>
        <Row className='m-3 PassBtn'>
          <Button className='btn-dark' onClick={getpass}>Generate</Button>
        </Row>

      </div>
    </div >
  );
}

export default App;
