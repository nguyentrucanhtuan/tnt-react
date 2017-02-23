import Navigo from 'navigo'
import {Routes,getRoute} from './routes'
let routerManager = new Navigo(null, false);
export const navigate = (route) => {
  routerManager.navigate(route);
  //window.location.href = (routerManager.root || '').replace('#', '');
  /*setTimeout(function () {
      window.location.reload(true);
  }, 200);*/
}


/*window.onpopstate = function (event) {
  console.log(event)
  if (event.state) {
    setTimeout(function () {
        window.location.reload(true);
    }, 200);
  } else {
    // history changed because of a page load
  }
}*/

window.onpopstate = function(event) {
  window.location.reload(true);
  /*setTimeout(function () {
      window.location.reload(true);
  }, 10);*/
};
export default routerManager;
