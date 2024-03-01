import RestaurantController from '../controllers/RestaurantController.js'

const loadFileRoutes = function (app) {
  app.route('/restaurants') // the endpoint path
    .get(
      RestaurantController.index) // the function that will attend requests for that http verb and that path
    .post( // we can chain more http verbs for the same endpoint
      RestaurantController.create) // the function that will attend requests for that http verb and that path

  app.route('/restaurants/:restaurantId') // the endpoint path
    .get( // the http verb that we want to be available at the previous path
      RestaurantController.show) // the function that will attend requests for that http verb and that path
    .put( // we can chain more http verbs for the same endpoint
      RestaurantController.update) // the function that will attend requests for that http verb and that path
    .delete(RestaurantController.destroy)

  app.route('/restaurants/:restaurantId/orders') // the endpoint path
    .get( // the http verb that we want to be available at the previous path
      OrderController.index) // the function that will attend requests for that http verb and that path

  app.route('/restaurants/:restaurantId/products') // the endpoint path
    .get( // the http verb that we want to be available at the previous path
      ProductController.indexRestaurant) // the function that will attend requests for that http verb and that path

  app.route('/restaurants/:restaurantId/analytics') // the endpoint path
    .get( // the http verb that we want to be available at the previous path
      OrderController.index) // the function that will attend requests for that http verb and that path
}
export default loadFileRoutes
