import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
  {
    id: '62a99e173c1942691d27c2b4',
    name: 'Echeveria Dark Ice',
    size: {
      width: 3,
      length: 14,
      height: 37,
      radius: 81,
    },
    category: 'Succulents',
    rarety: false,
    description:
      'Dark Ice is a compact rosettes succulent which has spoon-shaped leaves. The greyish blue leaves can turn to reddish and deep purple when stressed, which is very charming',
    status: 'In Stock',
    priceLists: [
      {
        price: 5.19,  
      },
      {
        price: 2,  
      },
    ],
    colors: ['Mauv', 'Purple', 'Indigo', 'Orange', 'Fuscia'],
    reviews: {
      create: [
        {
          description: "this is beautiful",
          rating: 4,
          title: 'review title',
          customerId: ''
        }
      ]
      
    }

  },
  // {
  //   id: '62a99e173c1942691d27c2b8',
  //   name: 'Echeveria Baby Finger',
  //   size: {
  //     width: 12,
  //     length: 28,
  //     height: 46,
  //     radius: 78,
  //   },
  //   category: 'Succulent',
  //   rarety: false,
  //   description:
  //     'Baby finger is rarety Korean Succulent. Its leaves are chubby like babys fingers, typically soft to vivid lavendar color, will turn bright mangos and pink color when they grow well, such as insufficient light and the leaves will be grayish green.The leaves are covered in a powdery wax called farina that protects them in full sun and gives a nice, matte finish.',
  //   status: 'In Stock',
  //   priceLists: [
  //     {
  //       price: 5.99,  
  //     },
  //     {
  //       price: 2.99,  
  //     },
  //   ],
  //   colors: ['Red', 'Khaki', 'Aquamarine', 'Maroon'],
  //   reviews: ['62a994a78e7fe122350e1d02', '62a994a78e7fe122350e1d01'],
  //   stockIds: ['62a99eb18b5abb7c51972215'],
  //   imageIds: ['62c699029493c7a44f46fb88'],
  // },
  // {
  //   id: '62a99e173c1942691d27c2bf',
  //   name: 'Graptoveria Lovely Rose',
  //   size: {
  //     width: 81,
  //     length: 62,
  //     height: 98,
  //     radius: 87,
  //   },
  //   category: 'Succulents',
  //   rarety: false,
  //   description:
  //     'Lovely Rose is a small, attractive succulent plant with tightly compacted, plump, gray-green leaves that form a beautiful, rose-like cluster on the top of a bare stem. This mini succulent is easy to grow, and branch.',
  //   status: 'In Stock',
  //   priceLists: [
  //     {
  //       price: 5.99,  
  //     },
  //     {
  //       price: 2.99,  
  //     },
  //   ],
  //   colors: ['Orange', 'Aquamarine', 'Red', 'Teal'],
  //   reviews: ['62a994a78e7fe122350e1d01', '62a994a78e7fe122350e1d06'],
  //   stockIds: ['62a99eb18b5abb7c51972216'],
  //   imageIds: ['62c699029493c7a44f46fb87'],
  // },
  // {
  //   id: '62c90b149d7b9541666af695',
  //   name: 'Graptoveria Biante',
  //   size: {
  //     width: 81,
  //     length: 62,
  //     height: 98,
  //     radius: 87,
  //   },
  //   category: 'Succulents',
  //   rarety: false,
  //   description:
  //     'Lovely Rose is a small, attractive succulent plant with tightly compacted, plump, gray-green leaves that form a beautiful, rose-like cluster on the top of a bare stem. This mini succulent is easy to grow, and branch.',
  //   status: 'In Stock',
  //   priceLists: [
  //     {
  //       price: 5.99,  
  //     },
  //     {
  //       price: 2.99,  
  //     },
  //   ],
  //   colors: ['Orange', 'Aquamarine', 'Red', 'Teal'],
  //   reviews: ['62a994a78e7fe122350e1d01', '62a994a78e7fe122350e1d06'],
  //   stockIds: ['62a99eb18b5abb7c51972216'],
  //   imageIds: ['62c699029493c7a44f46fb86'],
  // },
  // {
  //   name: 'Echeveria Alba Beauty',
  //   size: {
  //     width: 81,
  //     length: 62,
  //     height: 98,
  //     radius: 87,
  //   },
  //   category: 'Succulents',
  //   rarety: false,
  //   description:
  //     'Echeveria alba beauty features pointy fleshy blueish-green leaves. When stressed, the leaves turn lovely vibrant orange to pink color on the tips. They arent as vibrant in the summer, but they are still really pretty with leaves symmetrically formed.',
  //   status: 'In Stock',
  //   priceLists: [
  //     {
  //       price: 5.99,  
  //     },
  //     {
  //       price: 2.99,  
  //     },
  //   ],
  //   colors: ['Orange', 'Aquamarine', 'Red', 'Teal'],
  //   reviews: ['62a994a78e7fe122350e1d01', '62a994a78e7fe122350e1d06'],
  //   stockIds: ['62a99eb18b5abb7c51972216'],
  //   imageIds: ['62c699029493c7a44f46fb85'],
  // },
  // {
  //   id: '62c90b149d7b9541666af69b',
  //   name: 'Echeveria Mebina',
  //   size: {
  //     width: 81,
  //     length: 62,
  //     height: 98,
  //     radius: 87,
  //   },
  //   category: 'Succulents',
  //   rarety: false,
  //   description:
  //     'due to its red edge leaves, also called red edge echeveria. Its leaves are long and thin, formed close to a rosette, blooming in spring. Mebina is easy to grow to cluster, which is suitable for making small pot combinations.',
  //   status: 'In Stock',
  //   priceLists: [
  //     {
  //       price: 4.99,  
  //     },
  //     {
  //       price: 1.99,  
  //     },
  //   ],
  //   colors: ['Orange', 'Aquamarine', 'Red', 'Teal'],
  //   reviews: ['62a994a78e7fe122350e1d01', '62a994a78e7fe122350e1d06'],
  //   stockIds: ['62a99eb18b5abb7c51972216'],
  //   imageIds: ['62c699029493c7a44f46fb84'],
  // },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of productData) {
    const product = await prisma.product.create({
      data: u,
    });
    console.log(`Created product with id: ${product.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
