import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
} from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';
import { context, Context } from './context';

export const DateTime = asNexusMethod(DateTimeResolver, 'date');

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allProducts', {
      type: 'Product',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.product.findMany();
      },
    });

    t.nullable.field('productById', {
      type: 'Product',
      args: {
        id: stringArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.product.findUnique({
          where: { id: args.id },
        });
      }
    });

    // t.nullable.field('postById', {
    //   type: 'Post',
    //   args: {
    //     id: intArg(),
    //   },
    //   resolve: (_parent, args, context: Context) => {
    //     return context.prisma.post.findUnique({
    //       where: { id: args.id || undefined },
    //     })
    //   },
    // })

    // t.nonNull.list.nonNull.field('feed', {
    //   type: 'Post',
    //   args: {
    //     searchString: stringArg(),
    //     skip: intArg(),
    //     take: intArg(),
    //     orderBy: arg({
    //       type: 'PostOrderByUpdatedAtInput',
    //     }),
    //   },
    //   resolve: (_parent, args, context: Context) => {
    //     const or = args.searchString
    //       ? {
    //           OR: [
    //             { title: { contains: args.searchString } },
    //             { content: { contains: args.searchString } },
    //           ],
    //         }
    //       : {}

    //     return context.prisma.post.findMany({
    //       where: {
    //         published: true,
    //         ...or,
    //       },
    //       take: args.take || undefined,
    //       skip: args.skip || undefined,
    //       orderBy: args.orderBy || undefined,
    //     })
    //   },
    // })

    // t.list.field('draftsByUser', {
    //   type: 'Post',
    //   args: {
    //     userUniqueInput: nonNull(
    //       arg({
    //         type: 'UserUniqueInput',
    //       }),
    //     ),
    //   },
    //   resolve: (_parent, args, context: Context) => {
    //     return context.prisma.user
    //       .findUnique({
    //         where: {
    //           id: args.userUniqueInput.id || undefined,
    //           email: args.userUniqueInput.email || undefined,
    //         },
    //       })
    //       .posts({
    //         where: {
    //           published: false,
    //         },
    //       })
    //   },
    // })
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createProduct', {
      type: 'Product',
      args: {
        data: nonNull(
          arg({
            type: 'ProductCreateInput',
          })
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.product.create({
          data: {
            name: args.data.name,
            description: args.data.description,
            category: args.data.category,
            status: args.data.status,
            rarety: args.data.rarety,
            colors: args.data.colors,
            size: args.data.size,
          },
        });
      },
    });

    //     t.field('createDraft', {
    //       type: 'Post',
    //       args: {
    //         data: nonNull(
    //           arg({
    //             type: 'PostCreateInput',
    //           }),
    //         ),
    //         authorEmail: nonNull(stringArg()),
    //       },
    //       resolve: (_, args, context: Context) => {
    //         return context.prisma.post.create({
    //           data: {
    //             title: args.data.title,
    //             content: args.data.content,
    //             author: {
    //               connect: { email: args.authorEmail },
    //             },
    //           },
    //         })
    //       },
    //     })

    //     t.field('togglePublishPost', {
    //       type: 'Post',
    //       args: {
    //         id: nonNull(intArg()),
    //       },
    //       resolve: async (_, args, context: Context) => {
    //         try {
    //           const post = await context.prisma.post.findUnique({
    //             where: { id: args.id || undefined },
    //             select: {
    //               published: true,
    //             },
    //           })
    //           return context.prisma.post.update({
    //             where: { id: args.id || undefined },
    //             data: { published: !post?.published },
    //           })
    //         } catch (e) {
    //           throw new Error(
    //             `Post with ID ${args.id} does not exist in the database.`,
    //           )
    //         }
    //       },
    //     })

    //     t.field('incrementPostViewCount', {
    //       type: 'Post',
    //       args: {
    //         id: nonNull(intArg()),
    //       },
    //       resolve: (_, args, context: Context) => {
    //         return context.prisma.post.update({
    //           where: { id: args.id || undefined },
    //           data: {
    //             viewCount: {
    //               increment: 1,
    //             },
    //           },
    //         })
    //       },
    //     })

    //     t.field('deletePost', {
    //       type: 'Post',
    //       args: {
    //         id: nonNull(intArg()),
    //       },
    //       resolve: (_, args, context: Context) => {
    //         return context.prisma.post.delete({
    //           where: { id: args.id },
    //         })
    //       },
    //     })
  },
});

const Product = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nullable.string('category');
    t.nonNull.string('status');
    t.nullable.boolean('rarety');
    t.nonNull.list.string('colors');
    t.nullable.field('size', {
      type: 'Size',
      resolve: (parent, _args, context: Context) => {
        return {
          width: parent.size.width,
          length: parent.size.length,
          height: parent.size.height,
          radius: parent.size.radius,
        };
      },
    });
    t.nonNull.list.field('priceList', {
      type: 'PriceList',
      resolve: (parent, _args, context: Context) => {
        return [
          {
            price: parent.priceList.price,
            createdAt: parent.priceList.createdAt,
          },
        ];
      },
    });
    t.nonNull.list.field('stock', {
      type: 'Stock',
      resolve: (parent, _args, context: Context) => {
        return [
          {
            total: parent.stock.total,
            action: parent.stock.action,
            actionAmount: parent.stock.actionAmount,
            actionPrice: parent.stock.actionPrice,
            createdAt: parent.stock.createdAt,
          },
        ];
      },
    });
    t.nullable.list.field('reviews', {
      type: 'Review',
      resolve: (parent, _args, context: Context) => {
        return context.prisma.review.findUnique({
          where: { id: parent.id || undefined },
        });
      },
    });
    t.nullable.list.field('images', {
      type: 'Image',
      resolve: (parent, _args, context: Context) => {
        return context.prisma.image.findUnique({
          where: { id: parent.id || undefined },
        });
      },
    });
  },
});

const Size = objectType({
  name: 'Size',
  definition(t) {
    t.nullable.float('width');
    t.nullable.float('length');
    t.nullable.float('height');
    t.nullable.float('radius');
  },
});

const PriceList = objectType({
  name: 'PriceList',
  definition(t) {
    t.nullable.float('price');
  },
});

const Stock = objectType({
  name: 'Stock',
  definition(t) {
    t.nullable.float('total');
    t.nullable.string('action');
    t.nullable.float('actionAmount');
    t.nullable.float('actionPrice');
  },
});

const Review = objectType({
  name: 'Review',
  definition(t) {
    t.nullable.string('title');
    t.nullable.string('description');
    t.nonNull.int('rating');
    t.nullable.string('title');
    // t.nonNull.field('customer', {
    //   type: 'Customer',
    //   resolve: (parent, _args, context: Context) => {
    //     return context.prisma.image.findUnique({
    //       where: { id: parent.id || undefined },
    //     });
    //   },
    // });
  },
});

const Image = objectType({
  name: 'Image',
  definition(t) {
    t.nullable.string('category');
    t.nullable.string('name');
    t.nullable.int('length');
    t.nullable.int('width');
    t.nullable.float('size');
    t.nullable.string('format');
    t.nullable.string('imageLink');
    t.nullable.list.nullable.field('products', {
      type: 'Product',
      resolve: (parent, _args, context: Context) => {
        return context.prisma.image
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .product();
      },
    });
  },
});

//******************************** Customer **************************************

const Customer = objectType({
  name: 'Customer',
  definition(t) {
    t.nullable.string('email');
    t.nullable.string('password');
    t.nullable.string('firstName');
    t.nullable.string('lastName');
    t.nullable.string('phone');
    t.nullable.string('status');
    t.nullable.string('role');
    t.nullable.string('wechatId');
    t.nullable.string('paypalId');
    t.nullable.list.nullable.field('creditCards', {
      type: 'CreditCard',
      resolve: (parent, _args, context: Context) => {
        return context.prisma.customer
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .creditCards();
      },
    });
    t.nullable.list.nullable.field('addresses', {
      type: 'Address',
      resolve: (parent, _args, context: Context) => {
        return context.prisma.customer
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .addresses();
      },
    });
    t.nullable.list.nullable.field('orders', {
      type: 'Order',
      resolve: (parent, _args, context: Context) => {
        return context.prisma.customer
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .orders();
      },
    });
    t.nullable.list.nullable.field('Review', {
      type: 'Review',
      resolve: (parent, _args, context: Context) => {
        return context.prisma.customer
          .findUnique({
            where: { id: parent.id || undefined },
          }).reviews();
      },
    });
  },
});

const CreditCard = objectType({
  name: 'CreditCard',
  definition(t) {
    t.nullable.string('cardNo');
    t.nullable.string('expiryDate');
    t.nullable.string('holderName');
  },
});

const Address = objectType({
  name: 'Address',
  definition(t) {
    t.nullable.string('category');
    t.nullable.string('firstName');
    t.nullable.string('lastName');
    t.nullable.string('address');
    t.nullable.string('apartment');
    t.nullable.string('city');
    t.nullable.string('country');
    t.nullable.string('state');
    t.nullable.string('zipcode');
    t.nullable.string('phone1');
    t.nullable.string('phone2');
  },
});

//******************************** Order **************************************

const Order = objectType({
  name: 'Order',
  definition(t) {
    t.nullable.string('customer');
    t.nullable.string('shippingAddress');
    t.nullable.string('billingAddress');
    t.nullable.string('orderDate');
    t.nullable.string('orderStatus');
    t.nullable.string('productsInOrder');
    t.nullable.string('delivery');
    t.nullable.string('payment');
    t.nullable.string('customerId');
  },
});

const ProductInOrder = objectType({
  name: 'ProductInOrder',
  definition(t) {
    t.nullable.string('qty');
    t.nullable.string('product');
    t.nullable.string('price');
    t.nullable.string('Order');
    t.nullable.string('orderId');
    t.nullable.string('productId');
  },
});

const Delivery = objectType({
  name: 'Delivery',
  definition(t) {
    t.nullable.string('deliveryCompany');
    t.nullable.string('deliveryType');
    t.nullable.string('traceNo');
  },
});

const Payment = objectType({
  name: 'Payment',
  definition(t) {
    t.nullable.string('method');
    t.nullable.string('date');
    t.nullable.string('amount');
    t.nullable.string('status');
    t.nullable.string('payMethodId');
  },
});

const User = objectType({
  name: 'User',
  definition(t) {
    t.nullable.string('email');
    t.nullable.string('name');
    t.nullable.string('posts');
  },
});

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nullable.string('createdAt');
    t.nullable.string('updatedAt');
    t.nullable.string('title');
    t.nullable.string('content');
    t.nullable.string('published');
    t.nullable.string('viewCount');
    t.nullable.string('author');
    t.nullable.string('authorId');
  },
});

const SizeCreateInput = inputObjectType({
  name: 'SizeCreateInput',
  definition(t) {
    t.nonNull.int('width');
    t.nonNull.int('length');
    t.nonNull.int('height');
    t.nonNull.int('radius');
  },
});

const ProductCreateInput = inputObjectType({
  name: 'ProductCreateInput',
  definition(t) {
    t.nullable.string('id');
    t.nonNull.string('name');
    t.nullable.string('description');
    t.nullable.string('category');
    t.nonNull.string('status');
    t.nullable.boolean('rarety');
    t.nonNull.list.string('colors');
    t.nonNull.field('size', { type: 'SizeCreateInput' });
  },
});

export const schema = makeSchema({
  types: [
    Query,
    Product,
    Size,
    Mutation,
    ProductCreateInput,
    SizeCreateInput,
    PriceList,
    Review,
    Stock,
    Image,
    Customer,
    Order,
    CreditCard,
    Address,
    ProductInOrder,
    Delivery,
    Payment,

    // Post,
    // UserUniqueInput,
    // UserCreateInput,
    // PostCreateInput,
    // SortOrder,
    // PostOrderByUpdatedAtInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});
