import Head from 'next/head';
import Link from 'next/link';
import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";

const koneksiSepatu = axios.create({ 
  baseURL: "http://127.0.0.1:5000/api/sepatu" 
});

export default function Home() {
  const [statenama, setNama] = useState("");
  const [statekode, setKode] = useState("");
  const [stateukuran, setUkuran] = useState("");
  const [stateharga, setHarga] = useState("");
  const [statefoto, setFoto] = useState("");
  const [statejumlahstok, setJumlahstok] = useState("");
  const [sepatu, setSepatu] =  useState(null);

  const handleSubmitEdit =  (event) => {
    event.preventDefault();
    const address = "/"+event.target.kode.value;
  
    const formData = {
      kode: event.target.kode.value,
      nama: event.target.nama.value,
      ukuran: event.target.ukuran.value,
      harga: event.target.harga.value,
      jumlahStok: event.target.jumlahStok.value
    }

  koneksiSepatu
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    }); 
  }

  const handleEdit = (event) => {
    event.preventDefault();
    var kode = event.target.value;

    const mhsEdit =  sepatu.filter((sepatu) => {
      return sepatu.kode == kode;
    });
    
    if(mhsEdit!=null){
      setNama(mhsEdit[0].nama);
      setKode(mhsEdit[0].kode);
      setUkuran(mhsEdit[0].ukuran);
      setJumlahstok(mhsEdit[0].jumlahstok);
      setHarga(mhsEdit[0].harga);
      setFoto(mhsEdit[0].foto);
    }
  }

  const handleDelete = (event) => {
    event.preventDefault();
    var kode = event.target.value;
    koneksiSepatu.delete(`/${kode}`)
      .then(response => {
        console.log('Data berhasil dihapus:', response.data);
        window.location.reload();
        setSepatu(
          sepatu.filter((sepatu) => {
            return sepatu.kode !== kode;
          })
        )
      })
      
      .catch(error => {
        console.error('Gagal menghapus data:', error);
      })
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
        <center>
          <div className="kiri-list" style={{backgroundColor:"rgba(0,0,0,0.8)",color:"#fff"}}>
            <form id="formedit" onSubmit={handleSubmitEdit}> 
              <table border={0}>
                <tbody>
                  
                  <tr>
                    <td><input style={{display:"none"}} type="text" id="kode" value={statekode} name="kode"/></td>
                  </tr>
              
                  <tr>
                    <td><label> nama barang:</label></td>
                    <td><input type="text" id="nama" value={statenama} name="nama" onChange={(e) => setNama(e.target.value)} /></td>
                  </tr>
                  
                  <tr>
                    <td><label> Foto:</label></td>
                    <td><img src={statefoto} width="80"/></td>
                  </tr>

                  <tr>
                    <td><label> ukuran barang:</label></td>
                    <td><input type="text" id="ukuran" value={stateukuran} name="ukuran" onChange={(e) => setUkuran(e.target.value)} /></td>
                  </tr>

                  <tr>
                    <td><label> harga barang:</label></td>
                    <td><input type="text" id="harga" value={stateharga} name="harga" onChange={(e) => setHarga(e.target.value)} /></td>
                  </tr>

                  <tr>
                    <td><label> jumlah stok:</label></td>
                    <td><input type="text" id="jumlahStok" value={statejumlahstok} name="jumlahStok" onChange={(e) => setJumlahstok(e.target.value)} /></td>
                  </tr>

                </tbody>
              </table><br></br>
              <input type="submit" />
            </form>
          </div>
          <div className="kanan-list"style={{backgroundColor:"rgba(0,0,0,0.8)",color:"#fff",paddingTop:"2%"}}>
            <table border={1}>
              <thead>
                <tr>
                  <td><b>Kode</b></td> 
                  <td><b>Nama</b></td>
                  <td><b>Foto</b></td>
                  <td><b>Ukuran</b></td>
                  <td><b>Harga</b></td>
                  <td><b>Jumlah stok</b></td>
                  <td colSpan={2}><b>Action</b></td>
                </tr>
              </thead>
              <tbody>
                {sepatu.map((mhs) => 
                  <tr>
                    <td>{mhs.kode}</td>
                    <td>{mhs.nama}</td>
                    <td><img src={mhs.foto} width="80"/></td>
                    <td>{mhs.ukuran}</td>
                    <td>{mhs.harga}</td>
                    <td>{mhs.jumlahstok}</td>
                    <td><button onClick={handleEdit} value={mhs.kode}>edit</button></td>
                    <td><button onClick={handleDelete} value={mhs.kode}>delete</button></td>
                  </tr>
                )}     
              </tbody>
            </table>
          </div>
          </center>
      </div>
    </>
  )
}
}