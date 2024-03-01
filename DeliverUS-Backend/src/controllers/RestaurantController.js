import { Restaurant, Product, RestaurantCategory, ProductCategory } from '../models/models.js'

const index = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

// TODO: Complete the following functions

const create = async function (req, res) {
  const newRestaurant = Restaurant.build(req.body)

  newRestaurant.userId = req.user.id

  if (typeof req.files?.heroImage !== 'undefined') {
    newRestaurant.heroImage = req.files.heroImage[0].destination
  }

  if (typeof req.files?.heroImage !== 'undefined') {
    newRestaurant.logo = req.files.logo[0].destination + '/' + req.files.heroImage[0].filename
  }

  try {
    const restaurant = await newRestaurant.save()

    res.json(restaurant)
  } catch (error) {
    res.status(500).send(error)
  }
}

const show = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: ['id', 'name', 'description', 'address', 'postalCode', 'url', 'shippingCosts', 'averageServiceMinutes', 'email', 'phone',
          'logo', 'heroImage', 'status', 'restaurantCategoryId'],
        include:
        {
          model: RestaurantCategory, as: 'restaurantCategory'
        },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    const restaurant = await Restaurant.findByPK(req.params.restaurantId, {
      atributes: { exclude: ['userId'] },
      include: [{
        model: Product,
        as: 'products',
        include: { model: ProductCategory, as: 'productCategory' }
      },
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      }],
      order: [[{ model: Product, as: 'products' }, 'order', 'ASC']]

    })
    res.json(restaurant)
    res.json(restaurants)
  } catch (error) {
    res.status(500).send(error)
  }
}

const update = async function (req, res) {
  if (typeof req.files?.heroImage !== 'undefined') {
    req.body.heroImage = req.files.heroImage[0].destination + '/' + req.files.heroImage[0].filename
  }

  if (typeof req.files?.logo !== 'undefined') {
    req.body.logo = req.files.logo[0].destination + '/' + req.logo[0].filename
  }

  try {
    await Restaurant.update(req.body, { where: { id: req.params.restaurantId } })

    const updatedRestaurant = await Restaurant.findByPK(req.params.restaurantId)

    res.json(updatedRestaurant)
  } catch (error) {
    res.catch(500).send(error)
  }
}

const destroy = async function (req, res) {
  try {
    const result = await Restaurant.destroy({ where: { id: req.params.restaurantId } })

    let message = ' '

    if (result === 1) {
      message = 'Id de restaurante eliminado correctamente.' + req.params.restaurantId
    } else {
      message = 'El Id de restaurante no ha podido ser eliminado.'
    }

    res.json(message)
  } catch (error) {
    res.status(500).send(error)
  }
}

const RestaurantController = {
  index,
  create,
  show,
  update,
  destroy
}
export default RestaurantController
