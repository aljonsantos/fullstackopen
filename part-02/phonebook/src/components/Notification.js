import { useState, useEffect } from 'react'

const Notification = ({ data, setNotif }) => {
  const { msg, type } = data;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (msg) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setNotif({
          msg: null,
          type: ''
        })
      }, 3000);
      // const timer = setTimeout(() => {
      //   setShow(false);
      // }, 3000);
      // return () => clearTimeout(timer); // cleanup function
    }
  }, [msg, setNotif]);

  if (!show) {
    return null;
  }

  return (
    <div className={`notif ${type}`}>
      {msg}
    </div>
  )
}

export default Notification