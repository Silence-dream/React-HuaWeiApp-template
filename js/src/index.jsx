const root = ReactDOM.createRoot(document.getElementById('root'));

function App(){
  return (
    <div onClick={()=>alert("1111")}>123213</div>
  )
}

root.render(<App/>);


