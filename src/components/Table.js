import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faCaretDown, faCaretUp, faTrashCan, faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './table.module.css'
import { useState } from 'react';

const Table = ({ data, setData, setForm, }) => {
    const [media, setMedia] = useState(false)

    const remove = (id) => {
        let minor = [...data];
        minor = minor.filter(element => element.id !== id)
        setData(minor)
    }

    const firstName = (input) => {
        let items = [...data]
        switch (input) {
            case 'ASCENDING':
                const ascend = items.sort((a, b) => a.first.toLowerCase().localeCompare(b.first.toLowerCase()))
                setData(ascend);
                break;
            case 'DESCENDING':
                const descend = items.sort((a, b) => b.first.toLowerCase().localeCompare(a.first.toLowerCase()))
                setData(descend);
                break;
            default:
                break;
        }
    }

    const lastName = (input) => {
        let items = [...data]
        switch (input) {
            case 'ASCENDING':
                const ascend = items.sort((a, b) => a.last.toLowerCase().localeCompare(b.last.toLowerCase()))
                setData(ascend);
                break;
            case 'DESCENDING':
                const descend = items.sort((a, b) => b.last.toLowerCase().localeCompare(a.last.toLowerCase()))
                setData(descend);
                break;
            default:
                break;
        }
    }

    const byNumber = (input) => {
        let items = [...data]
        switch (input) {
            case 'ASCENDING':
                const ascend = items.sort((a, b) => a.phone - b.phone)
                setData(ascend);
                break;
            case 'DESCENDING':
                const descend = items.sort((a, b) => b.phone - a.phone)
                setData(descend);
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.details}>
            <div className={styles.head}>
                <div className={styles.header}>
                    <button className={media ? styles.arrow1 : styles.arrow} onClick={() => setMedia(!media)}>Sort by
                        <FontAwesomeIcon icon={media ? faXmark : faArrowRight} />
                    </button>
                    <p className={media ? styles.children : styles.child}>first name <span className={styles.span}>
                        <FontAwesomeIcon onClick={() => firstName('ASCENDING')} icon={faCaretUp} className={styles.awesome}/>
                        <FontAwesomeIcon onClick={() => firstName('DESCENDING')} icon={faCaretDown} className={styles.awesome1} />
                    </span></p>
                    <p className={media ? styles.children : styles.child} >last name <span className={styles.span}>
                        <FontAwesomeIcon onClick={() => lastName('ASCENDING')} icon={faCaretUp} className={styles.awesome} />
                        <FontAwesomeIcon onClick={() => lastName('DESCENDING')} icon={faCaretDown} className={styles.awesome1} />
                    </span></p>
                    <p className={media ? styles.children : styles.child}>phone number <span className={styles.span}>
                        <FontAwesomeIcon onClick={() => byNumber('ASCENDING')} icon={faCaretUp} className={styles.awesome} />
                        <FontAwesomeIcon onClick={() => byNumber('DESCENDING')} icon={faCaretDown} className={styles.awesome1} />
                    </span></p>
                </div>
            </div>
            {data.length > 0 ? data.map((item, index) => <li className={styles.head1} key={index}>
                <button onClick={() => setForm(item)} className={styles.icon}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                    <p className={styles.first}>{item.first}</p>
                    <p className={styles.last}>{item.last}</p>
                    <p className={styles.phone}>{item.phone}</p>
                <button onClick={() => remove(item.id)} className={styles.icon1}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </li>) : <p className={styles.contacts}>No contacts added yet...</p>}
        </div>
    )
}

export default Table