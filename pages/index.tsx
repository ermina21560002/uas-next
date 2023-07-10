import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const halaman = (event) => {
    alert("Anda sudah berada di halaman Beranda");
  }

  return (
    <>
      <Head>
        <title>Beranda</title>
      </Head>
      <div className="container-beranda">
        <div className="navbar-beranda">
          <div className="kiri-beranda">
            <h1>Toko Sepatu</h1>
          </div>
          <div className="kanan-beranda">
            <ul>
              <li><Link href="#" onClick={halaman}>Beranda</Link></li>
              <li><Link href="/input">Input Barang</Link></li>
              <li><Link href="/list">List Barang</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
