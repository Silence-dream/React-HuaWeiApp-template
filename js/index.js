var root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  return React.createElement(
    "div",
    { onClick: function onClick() {
        return alert("1111");
      } },
    "123213"
  );
}

root.render(React.createElement(App, null));