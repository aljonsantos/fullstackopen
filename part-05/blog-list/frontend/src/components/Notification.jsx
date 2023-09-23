const Notification = ({ data }) => {
  if (!data) {
    return null
  }

  const styles = {
    color: data.type === 'error' ? 'red' : 'green',
  }

  return (
    <div className={`notif ${data.type}`} style={styles}>
      {data.msg}
    </div>
  )
}

export default Notification