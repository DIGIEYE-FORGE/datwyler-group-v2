import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); 

// type License= {
//     description?: string;
//     tenantId: number;
//     startDate: Date;
//     expiredAt: Date;
//     numberUser: number;
//     numberAdmin: number;
//     numberDataCenter: number;
// };



// const arrauLicense: License[] = [
//     {
//         description: "Licence1",
//         tenantId: 1,
//         startDate: new Date(),
//         expiredAt: new Date(new Date().setDate(new Date().getDate() + 5)),
//         numberUser: 10,
//         numberAdmin: 2,
//         numberDataCenter: 1,
//     },
//     {
//         description: "Licence2",
//         tenantId: 1,
//         startDate: new Date(),
//         expiredAt: new Date(new Date().setDate(new Date().getDate() + 8)),
//         numberUser: 10,
//         numberAdmin: 7,
//         numberDataCenter: 10,
//     },
//     {
//         description: "Licence3",
//         tenantId: 1,
//         startDate: new Date(),
//         expiredAt: new Date(new Date().setDate(new Date().getDate() + 1)),
//         numberUser: 100,
//         numberAdmin: 10,
//         numberDataCenter: 10,
//     },
// ];



// const seedLicense = async (data: License): Promise<void> => {
//     await prisma.license.create({
//         data: {
//             ...data,
//         }
//     });
    
// }

const main = async (): Promise<void> => {
    // for (const license of arrauLicense) {
    //     await seedLicense(license);
    // }
}


main()



