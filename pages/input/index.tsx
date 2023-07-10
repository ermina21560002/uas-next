import Head from 'next/head';
import Link from 'next/link';
import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";

const koneksiSepatu = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/sepatu" 
});

export default function Home() {
  const [sepatu, setSepatu] =  useState(null);

  const handleSubmitAdd =  (event) => {  
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiSepatu
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      .then((res) => {
        console.log(res);
        window.location.reload();
        alert("Selamat data berhasil di input");
      })

      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    async function getSepatu() {
      const response = await koneksiSepatu.get("/").then(function (axiosResponse) {
        setSepatu(axiosResponse.data.data);
      })
        
      .catch(function (error) {   
        alert('error from Sepatu in api Sepatu: '+error);
      });
    }
    
    getSepatu();
  }, []);

if(sepatu==null){
  return(
    <div>
      waiting...
    </div>
  )
}else{
  return (
    <>
      <Head>
        <title>Beranda</title>
      </Head>
      <div className="container-beranda">
        <div className="navbar-beranda">
          <div className="kiri-input"><br/>
            <Link style={{marginLeft: "5%"}} href="/">Kembali</Link>
          </div>
        </div>
        <div className="isi-input">
          <form id="formadd" onSubmit={handleSubmitAdd} >
            <table border={0}>
              <tbody>
                
                <tr>
                  <td><label> Nama Barang:</label></td>
                  <td><input type="text" id="nama" name="nama" /></td>
                </tr>

                <br />
            
                <tr>
                  <td><label> Foto Barang:</label></td>
                  <td><input type="file" name="foto"/></td>
                </tr>

                <br />

                <tr>
                  <td><label> Ukuran Sepatu:</label></td>
                  <td><input type="text" id="ukuran" name="ukuran" /></td>
                </tr>

                <br />

                <tr>
                  <td><label> Jumlah Stok:</label></td>
                  <td><input type="text" id="jumlahStok" name="jumlahStok" /></td>
                </tr>

                <br />

                <tr>
                  <td><label> Harga Barang:</label></td>
                  <td><input type="text" id="harga" name="harga" /></td>
                </tr>

                <br />
              
              </tbody>
            </table>
            <center>
              <input type="submit" />
            </center>
          </form>
        </div>
      </div>
    </>
  )
}
}