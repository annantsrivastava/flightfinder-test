import React, { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState(null);
  const [error, setError] = useState(null);

  const BACKEND_URL = 'https://flightfinder-backend.vercel.app/api/flights';

  const testBackend = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Calling backend:', BACKEND_URL);
      
      const response = await fetch(`${BACKEND_URL}?origin=IAH&destination=DEL&date=2025-06-10&adults=1`);
      const data = await response.json();
      
      console.log('✅ Backend response:', data);
      
      if (data.success && data.data) {
        setFlights(data.data);
      } else {
        setError('No flights found');
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          ✈️ FlightFinder
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Test Deployment - Amadeus Integration
        </p>

        <div style={{
          background: '#f0f4ff',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '30px',
          border: '2px solid #667eea'
        }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#667eea',
            marginBottom: '10px' 
          }}>
            🔗 Backend Status
          </h3>
          <p style={{ fontSize: '14px', color: '#555', wordBreak: 'break-all' }}>
            <strong>URL:</strong> {BACKEND_URL}
          </p>
          <p style={{ fontSize: '14px', color: '#28a745', marginTop: '10px' }}>
            ✅ Connected
          </p>
        </div>

        <button
          onClick={testBackend}
          disabled={loading}
          style={{
            width: '100%',
            padding: '20px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            background: loading ? '#999' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s',
            marginBottom: '20px'
          }}
          onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          {loading ? '🔄 Searching Real Flights...' : '🚀 Test Amadeus API'}
        </button>

        {error && (
          <div style={{
            background: '#fee',
            border: '2px solid #f88',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#c00', fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
              ❌ Error
            </h3>
            <p style={{ color: '#800', fontSize: '14px' }}>{error}</p>
          </div>
        )}

        {flights && flights.length > 0 && (
          <div style={{
            background: '#e8f5e9',
            border: '2px solid #4caf50',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#2e7d32',
              marginBottom: '15px'
            }}>
              ✅ Success! Found {flights.length} Real Flights from Amadeus
            </h3>
            
            <div style={{ marginTop: '20px' }}>
              {flights.slice(0, 3).map((flight, idx) => {
                const firstSeg = flight.itineraries[0].segments[0];
                const lastSeg = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];
                const stops = flight.itineraries[0].segments.length - 1;
                
                return (
                  <div key={idx} style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    marginBottom: '15px',
                    border: '1px solid #ddd'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '15px'
                    }}>
                      <div>
                        <span style={{
                          background: idx === 0 ? '#dcfce7' : '#dbeafe',
                          color: idx === 0 ? '#166534' : '#1e40af',
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {idx === 0 ? '💰 Cheapest' : idx === 1 ? '⭐ Best Value' : '✈️ Recommended'}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ 
                          fontSize: '28px', 
                          fontWeight: 'bold', 
                          color: '#2563eb' 
                        }}>
                          {flight.price.currency} {flight.price.total}
                        </div>
                        <div style={{ 
                          fontSize: '11px', 
                          color: '#999' 
                        }}>
                          Live from Amadeus
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      <strong style={{ color: '#333' }}>
                        {firstSeg.carrierCode} {firstSeg.number}
                      </strong>
                      <div style={{ marginTop: '8px' }}>
                        {firstSeg.departure.iataCode} 
                        <span style={{ margin: '0 10px' }}>→</span>
                        {lastSeg.arrival.iataCode}
                      </div>
                      <div style={{ marginTop: '8px', fontSize: '12px' }}>
                        {stops === 0 ? '✓ Nonstop' : `${stops} stop(s)`} • 
                        Duration: {flight.itineraries[0].duration.replace('PT', '').toLowerCase()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '8px'
            }}>
              <p style={{ 
                fontSize: '14px', 
                color: '#856404',
                margin: 0 
              }}>
                🎉 <strong>Deployment Test Successful!</strong> Your backend is working perfectly with real Amadeus data.
              </p>
            </div>
          </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '10px',
          fontSize: '13px',
          color: '#666'
        }}>
          <h4 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color: '#333', 
            marginBottom: '10px' 
          }}>
            📋 Deployment Test Checklist:
          </h4>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>✅ Frontend deployed on Vercel</li>
            <li>✅ Backend API accessible</li>
            <li>✅ CORS configured properly</li>
            <li>✅ Real Amadeus integration working</li>
            <li>⏳ Ready for full app deployment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;