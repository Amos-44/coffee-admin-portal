import useFetch from '../hooks/useFetch.js';

function Home() {
  const { data } = useFetch('https://coffee-api-qm89.onrender.com/store_info');
  const store = data?.[0];

  return (
    <div
      style={{
        minHeight: '90vh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}
    >
      {/* IMAGE */}
      <img
        src="/CoffeeBackground.jpeg"
        alt="coffee"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />

      {/* OVERLAY */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }}
      />

      {/* CONTENT */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 style={{ fontSize: '3rem' }}>{store?.name}</h1>
        <p> {store?.description}</p>
        <p>📞 {store?.phone_number}</p>
      </div>
    </div>
  );
}

export default Home;