import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreator';

import Main from './Main';
//???????????????
function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    authenticate: state.authenticate
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
//actionCreators ({ just, the, ones you need }, dispatch)

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
