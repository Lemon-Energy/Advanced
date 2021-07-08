const e = React.createElement;

class MyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { change: false };
  }

  render() {
    if (this.state.change) {
      return '不是来！是来喔！！！';
    }

    return e(
      'button',
      { onClick: () => this.setState({ change: true }) },
      '来！'
    );
  }
}

const domContainer = document.querySelector('#app')
ReactDOM.render(e(MyButton), domContainer)