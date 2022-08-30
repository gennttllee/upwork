import styles from './app.module.css';
import { useState } from 'react';
import Table from './components/Table';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons'

function App() {
  const state = { first: '', last: '', phone: '' }
  const [form, setForm] = useState(state)
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (form.id){
      setShow(true)
    }
  }, [form]);

  const submitForm = (e) => {
    e.preventDefault()
    if (form.id) {
      let minor = []
      for (let element of data) {
        if (element.id === form.id) {
          minor.push(form)
        } else {
          minor.push(element)
        }
      }
      const newSor = minor.sort((a, b) => a.last.toLowerCase().localeCompare(b.last.toLowerCase()))
      setData(newSor);
    } else {
      let major = [...data]
      const id = Math.floor((Math.random() * 123456) + 1) * 654321
      major.push({ ...form, id })
      const newData = major.sort((a, b) => a.last.toLowerCase().localeCompare(b.last.toLowerCase()))
      setData(newData);
    }
    setForm(state)
    setShow(false)
  }

  const changes = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className={styles.app}>
      <button className={styles.visible} onClick={() => setShow(!show)}>Add contacts
        <FontAwesomeIcon icon={show ? faXmark : faArrowRight} />
      </button>
      <form onSubmit={submitForm} className={show ? styles.form1 : styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>First name</legend>
          <input value={form.first} className={styles.input} onChange={changes} name='first' required type='text' />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend>Last name</legend>
          <input value={form.last} onChange={changes} name='last' required className={styles.input} type='text' />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend>Phone number</legend>
          <input value={form.phone} onChange={changes} name='phone' required className={styles.input} type='tel' />
        </fieldset>
        <button className={styles.btn} type='submit'>continue</button>
      </form>
      <Table
        data={data}
        setData={setData}
        setForm={setForm}
      />
    </div>
  );
}

export default App;
