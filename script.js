const { useState } = React;

function App() {
  const [page, setPage] = useState('home');
  const [numMusicians, setNumMusicians] = useState(1);
  const [musicians, setMusicians] = useState(Array(numMusicians).fill({ instrument: '', playsOther: 'NO', otherInstrument: '' }));

  const handleNumMusiciansChange = (e) => {
    const newNumMusicians = parseInt(e.target.value, 10);
    setNumMusicians(newNumMusicians);
    setMusicians(Array(newNumMusicians).fill({ instrument: '', playsOther: 'NO', otherInstrument: '' }));
  };

  const handleInstrumentChange = (index, instrument) => {
    const newMusicians = [...musicians];
    newMusicians[index] = { ...newMusicians[index], instrument };
    setMusicians(newMusicians);
  };

  const handlePlaysOtherChange = (index, playsOther) => {
    const newMusicians = [...musicians];
    newMusicians[index] = { ...newMusicians[index], playsOther };
    setMusicians(newMusicians);
  };

  const handleOtherInstrumentChange = (index, otherInstrument) => {
    const newMusicians = [...musicians];
    newMusicians[index] = { ...newMusicians[index], otherInstrument };
    setMusicians(newMusicians);
  };

  const handleConfirmClick = () => {
    setPage('completed');
  };

  const handleHomeClick = () => {
    setPage('home');
  };

  const handleAnotherPreventivo = () => {
    setPage('form');
  };

  const instruments = [
    "Voce Solista",
    "Voce Coro",
    "Batteria Acustica",
    "Batteria Elettrica",
    "Percussioni",
    "Chitarra Elettrica",
    "Chitarra Acustica",
    "Basso Elettrico",
    "Basso Acustico",
    "Pianoforte/Tastiere",
    "Strumento a Fiato",
    "Strumento ad Arco"
  ];

  const prices = {
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 30,
    6: 35,
    7: 40,
    8: 60,
    9: 80,
    10: 100,
  };

  const price = prices[numMusicians] || 0;

  const getInstrumentsList = () => {
    const instrumentsList = [];
    musicians.forEach(musician => {
      instrumentsList.push(musician.instrument);
      if (musician.playsOther === 'SI') {
        instrumentsList.push(musician.otherInstrument);
      }
    });
    return instrumentsList.join(', ');
  };

  return (
    <div className="container">
      {page === 'home' && (
        <>
          <h1>Calcola il tuo Preventivo</h1>
          <p>Per cosa vuoi calcolare il tuo Preventivo?</p>
          <div className="buttons">
            <button className="button button-green" onClick={() => setPage('form')}>Registrazione di una Sessione di Prove</button>
            <button className="button button-orange">Registrazione di uno o più Brani in Studio</button>
          </div>
        </>
      )}
      {page === 'form' && (
        <div className="form-container">
          <button className="home-button" onClick={handleHomeClick}>HOME</button>
          <h1>Preventivo per Registrare le Prove</h1>
          <div className="form-group">
            <label className="form-label">Numero dei Musicisti:</label>
            <select className="form-select" value={numMusicians} onChange={handleNumMusiciansChange}>
              {[...Array(10).keys()].map(num => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>
          <div className="musician-list">
            {musicians.map((musician, index) => (
              <div key={index} className="musician-item">
                <h2>Musicista {index + 1}</h2>
                <div className="form-group">
                  <label className="form-label">Quale Strumento suona?</label>
                  <select
                    className="form-select"
                    value={musician.instrument}
                    onChange={(e) => handleInstrumentChange(index, e.target.value)}
                  >
                    <option value="">Seleziona uno strumento</option>
                    {instruments.map(instrument => (
                      <option key={instrument} value={instrument}>{instrument}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Questo Musicista suona altri Strumenti?</label>
                  <select
                    className="form-select"
                    value={musician.playsOther}
                    onChange={(e) => handlePlaysOtherChange(index, e.target.value)}
                  >
                    <option value="NO">NO</option>
                    <option value="SI">SI</option>
                  </select>
                </div>
                {musician.playsOther === 'SI' && (
                  <div className="form-group">
                    <label className="form-label">Quale altro Strumento suona?</label>
                    <select
                      className="form-select"
                      value={musician.otherInstrument}
                      onChange={(e) => handleOtherInstrumentChange(index, e.target.value)}
                    >
                      <option value="">Seleziona uno strumento</option>
                      {instruments.map(instrument => (
                        <option key={instrument} value={instrument}>{instrument}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="summary">
            <div className="summary-title">Riepilogo:</div>
            {musicians.map((musician, index) => (
              <div key={index} className="summary-item">
                <strong>Musicista {index + 1}:</strong>
                <div>Strumento principale: {musician.instrument}</div>
                {musician.playsOther === 'SI' && (
                  <div>Altro strumento: {musician.otherInstrument}</div>
                )}
              </div>
            ))}
            <button className="confirm-button" onClick={handleConfirmClick}>CONFERMA</button>
          </div>
        </div>
      )}
      {page === 'completed' && (
        <div className="completed-container">
          <h1 className="completed-title">PREVENTIVO ULTIMATO</h1>
          <p className="completed-text bold-text">
            Il prezzo per Registrare la Sessione di Prove di {numMusicians} Musicisti è pari ad €{price},00.
          </p>
          <p className="completed-text">
            Nella Sessione di Registrazione delle Prove verranno registrati i seguenti Strumenti: {getInstrumentsList()}.
          </p>
          <p className="completed-text">
            Il prezzo che stai leggendo si riferisce solo ed esclusivamente alla Registrazione della Sessione di Prove, quindi va sommato al consueto prezzo dell'affitto della Sala Prove per fascia oraria. Il tempo di Registrazione delle Prove non può essere superiore alle 2 ore indipendentemente da quanto tempo tu abbia affittato la Sala. Per opzioni diverse da queste, bisognerà concordare il prezzo a voce con il Personale di Diesis Garage Studio Recording & Mixing.
          </p>
          <div className="action-buttons">
            <button className="action-button action-button-green" onClick={handleAnotherPreventivo}>Voglio fare un altro Preventivo</button>
            <button className="action-button action-button-blue" onClick={handleHomeClick}>HOME</button>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
