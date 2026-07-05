openapi: 3.1.0
info:
  title: Api
  version: 0.1.0
  description: Beach brand e-commerce API
servers:
  - url: /api
    description: Base API path
tags:
  - name: health
    description: Health operations
  - name: products
    description: Product operations
  - name: cart
    description: Cart operations
  - name: orders
    description: Order operations
  - name: wishlist
    description: Wishlist operations
  - name: reviews
    description: Customer reviews
  - name: admin
    description: Admin operations
  - name: settings
    description: Site settings

paths:
  /healthz:
    get:
      operationId: healthCheck
      tags: [health]
      summary: Health check
      responses:
        "200":
          description: Healthy
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/HealthStatus"

  /products:
    get:
      operationId: listProducts
      tags: [products]
      summary: List products with optional filters
      parameters:
        - name: category
          in: query
          schema:
            type: string
        - name: size
          in: query
          schema:
            type: string
        - name: color
          in: query
          schema:
            type: string
        - name: minPrice
          in: query
          schema:
            type: number
        - name: maxPrice
          in: query
          schema:
            type: number
        - name: search
          in: query
          schema:
            type: string
        - name: featured
          in: query
          schema:
            type: boolean
        - name: bestSeller
          in: query
          schema:
            type: boolean
        - name: page
          in: query
          schema:
            type: integer
        - name: limit
          in: query
          schema:
            type: integer
      responses:
        "200":
          description: List of products
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ProductListResponse"
    post:
      operationId: createProduct
      tags: [products]
      summary: Create a new product (admin)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ProductInput"
      responses:
        "201":
          description: Created product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"

  /products/{id}:
    get:
      operationId: getProduct
      tags: [products]
      summary: Get product by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        "200":
          description: Product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"
        "404":
          description: Not found
    patch:
      operationId: updateProduct
      tags: [products]
      summary: Update a product (admin)
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ProductUpdate"
      responses:
        "200":
          description: Updated product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"
    delete:
      operationId: deleteProduct
      tags: [products]
      summary: Delete a product (admin)
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        "204":
          description: Deleted

  /products/featured:
    get:
      operationId: getFeaturedProducts
      tags: [products]
      summary: Get featured products for homepage
      responses:
        "200":
          description: Featured products
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Product"

  /products/best-sellers:
    get:
      operationId: getBestSellers
      tags: [products]
      summary: Get best-selling products
      responses:
        "200":
          description: Best sellers
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Product"

  /products/{id}/related:
    get:
      operationId: getRelatedProducts
      tags: [products]
      summary: Get related products
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        "200":
          description: Related products
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Product"

  /cart:
    get:
      operationId: getCart
      tags: [cart]
      summary: Get cart by session
      parameters:
        - name: sessionId
          in: query
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Cart
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Cart"
    post:
      operationId: addToCart
      tags: [cart]
      summary: Add item to cart
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CartItemInput"
      responses:
        "200":
          description: Updated cart
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Cart"

  /cart/{sessionId}/items/{productId}:
    patch:
      operationId: updateCartItem
      tags: [cart]
      summary: Update cart item quantity
      parameters:
        - name: sessionId
          in: path
          required: true
          schema:
            type: string
        - name: productId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CartItemUpdate"
      responses:
        "200":
          description: Updated cart
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Cart"
    delete:
      operationId: removeFromCart
      tags: [cart]
      summary: Remove item from cart
      parameters:
        - name: sessionId
          in: path
          required: true
          schema:
            type: string
        - name: productId
          in: path
          required: true
          schema:
            type: integer
      responses:
        "200":
          description: Updated cart
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Cart"

  /orders:
    post:
      operationId: createOrder
      tags: [orders]
      summary: Place an order
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/OrderInput"
      responses:
        "201":
          description: Created order
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Order"
    get:
      operationId: listOrders
      tags: [orders]
      summary: List all orders (admin)
      responses:
        "200":
          description: List of orders
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Order"

  /wishlist:
    get:
      operationId: getWishlist
      tags: [wishlist]
      summary: Get wishlist by session
      parameters:
        - name: sessionId
          in: query
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Wishlist items
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Product"
    post:
      operationId: addToWishlist
      tags: [wishlist]
      summary: Toggle product in wishlist
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WishlistInput"
      responses:
        "200":
          description: Wishlist items
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Product"

  /reviews:
    get:
      operationId: listReviews
      tags: [reviews]
      summary: List customer reviews
      responses:
        "200":
          description: Reviews
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Review"

  /admin/login:
    post:
      operationId: adminLogin
      tags: [admin]
      summary: Admin login with password
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/AdminLoginInput"
      responses:
        "200":
          description: Login success
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AdminAuth"
        "401":
          description: Invalid password

  /admin/stats:
    get:
      operationId: getAdminStats
      tags: [admin]
      summary: Get admin dashboard statistics
      responses:
        "200":
          description: Dashboard stats
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AdminStats"

  /settings:
    get:
      operationId: getSettings
      tags: [settings]
      summary: Get site settings (hero, footer, newsletter)
      responses:
        "200":
          description: Site settings
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SiteSettings"
    patch:
      operationId: updateSettings
      tags: [settings]
      summary: Update site settings (admin)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/SiteSettingsUpdate"
      responses:
        "200":
          description: Updated settings
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SiteSettings"

components:
  schemas:
    HealthStatus:
      type: object
      required: [status]
      properties:
        status:
          type: string

    Product:
      type: object
      required: [id, name, price, images, sizes, colors, category, stock, isFeatured, isBestSeller]
      properties:
        id:
          type: integer
        name:
          type: string
        description:
          type: ["string", "null"]
        price:
          type: number
        images:
          type: array
          items:
            type: string
        sizes:
          type: array
          items:
            type: string
        colors:
          type: array
          items:
            type: string
        category:
          type: string
        stock:
          type: integer
        isFeatured:
          type: boolean
        isBestSeller:
          type: boolean

    ProductInput:
      type: object
      required: [name, price, sizes, colors, category, stock]
      properties:
        name:
          type: string
        description:
          type: string
        price:
          type: number
        images:
          type: array
          items:
            type: string
        sizes:
          type: array
          items:
            type: string
        colors:
          type: array
          items:
            type: string
        category:
          type: string
        stock:
          type: integer
        isFeatured:
          type: boolean
        isBestSeller:
          type: boolean

    ProductUpdate:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        price:
          type: number
        images:
          type: array
          items:
            type: string
        sizes:
          type: array
          items:
            type: string
        colors:
          type: array
          items:
            type: string
        category:
          type: string
        stock:
          type: integer
        isFeatured:
          type: boolean
        isBestSeller:
          type: boolean

    ProductListResponse:
      type: object
      required: [products, total, page, totalPages]
      properties:
        products:
          type: array
          items:
            $ref: "#/components/schemas/Product"
        total:
          type: integer
        page:
          type: integer
        totalPages:
          type: integer

    CartItem:
      type: object
      required: [id, productId, quantity, size, color, product]
      properties:
        id:
          type: integer
        productId:
          type: integer
        quantity:
          type: integer
        size:
          type: string
        color:
          type: string
        product:
          $ref: "#/components/schemas/Product"

    Cart:
      type: object
      required: [sessionId, items, subtotal, total]
      properties:
        sessionId:
          type: string
        items:
          type: array
          items:
            $ref: "#/components/schemas/CartItem"
        subtotal:
          type: number
        total:
          type: number

    CartItemInput:
      type: object
      required: [sessionId, productId, quantity, size, color]
      properties:
        sessionId:
          type: string
        productId:
          type: integer
        quantity:
          type: integer
        size:
          type: string
        color:
          type: string

    CartItemUpdate:
      type: object
      required: [quantity]
      properties:
        quantity:
          type: integer
        size:
          type: string
        color:
          type: string

    Order:
      type: object
      required: [id, customerName, customerEmail, customerPhone, address, city, paymentMethod, items, subtotal, total, status, createdAt]
      properties:
        id:
          type: integer
        customerName:
          type: string
        customerEmail:
          type: string
        customerPhone:
          type: string
        address:
          type: string
        city:
          type: string
        paymentMethod:
          type: string
        items:
          type: array
          items:
            $ref: "#/components/schemas/CartItem"
        subtotal:
          type: number
        total:
          type: number
        status:
          type: string
        createdAt:
          type: string

    OrderInput:
      type: object
      required: [customerName, customerEmail, customerPhone, address, city, paymentMethod, sessionId]
      properties:
        customerName:
          type: string
        customerEmail:
          type: string
        customerPhone:
          type: string
        address:
          type: string
        city:
          type: string
        paymentMethod:
          type: string
        sessionId:
          type: string

    Review:
      type: object
      required: [id, name, rating, comment, location]
      properties:
        id:
          type: integer
        name:
          type: string
        rating:
          type: integer
        comment:
          type: string
        location:
          type: string
        avatar:
          type: ["string", "null"]

    WishlistInput:
      type: object
      required: [sessionId, productId]
      properties:
        sessionId:
          type: string
        productId:
          type: integer

    AdminLoginInput:
      type: object
      required: [password]
      properties:
        password:
          type: string

    AdminAuth:
      type: object
      required: [success, token]
      properties:
        success:
          type: boolean
        token:
          type: string

    AdminStats:
      type: object
      required: [totalOrders, totalRevenue, totalProducts, totalCustomers, recentOrders]
      properties:
        totalOrders:
          type: integer
        totalRevenue:
          type: number
        totalProducts:
          type: integer
        totalCustomers:
          type: integer
        recentOrders:
          type: array
          items:
            $ref: "#/components/schemas/Order"

    SiteSettings:
      type: object
      required: [heroTitle, heroSubtitle, heroVideoUrl, newsletterText, footerText]
      properties:
        heroTitle:
          type: string
        heroSubtitle:
          type: string
        heroVideoUrl:
          type: string
        heroButton1:
          type: string
        heroButton2:
          type: string
        newsletterText:
          type: string
        footerText:
          type: string

    SiteSettingsUpdate:
      type: object
      properties:
        heroTitle:
          type: string
        heroSubtitle:
          type: string
        heroVideoUrl:
          type: string
        heroButton1:
          type: string
        heroButton2:
          type: string
        newsletterText:
          type: string
        footerText:
          type: string
