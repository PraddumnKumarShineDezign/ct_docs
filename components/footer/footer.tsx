// 'use client';

// import { motion } from 'framer-motion';
// import type { ReactNode } from 'react';

// interface Developer {
//     id: number;
//     name: string;
//     title: string;
//     imageSrc: string;
//     skills: string[];
//     services: string[];
//     contactNumber: string;
//     email: string;
//     youtubeLink: string;
//     facebookLink: string;
//     instagramLink: string;
// }

// const developers: Developer[] = [
//     {
//         id: 1,
//         name: 'Pradum Shukla',
//         title: 'Full-Stack Web Developer',
//         imageSrc: '/assets/developer/pradum-shukla.jpeg',
//         skills: [
//             'React', 'Next.js', 'Angular', 'TypeScript', 'Node.js', 'Express.js',
//             'MongoDB', 'MySQL', 'Redis', 'TailwindCSS', 'GSAP', 'Framer Motion'
//         ],
//         services: [
//             'Custom Web Apps', 'API Integration', 'Responsive Design', 'Database Design',
//             'Performance Optimization', 'UI/UX Implementation'
//         ],
//         contactNumber: '918188898587',
//         email: 'pradumshukla1133@gmail.com',
//         youtubeLink: 'https://www.youtube.com/channel/UCiK5k3hOoDZInVnFYT1u12A',
//         facebookLink: 'https://www.facebook.com/pradum.shukla.146?mibextid=ZbWKwL',
//         instagramLink: 'https://www.instagram.com/mr_pradum_shukla?igsh=aXFyc2RkYjlpOXdw',
//     },
// ];

// // Simple icons
// const IconLink = ({ href, icon, label }: { href: string; icon: ReactNode; label: string }) => (
//     <a
//         href={href}
//         aria-label={label}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-indigo-600 hover:text-indigo-800 transition-colors"
//     >
//         {icon}
//     </a>
// );

// const Footer = () => {
//     const dev = developers[0];

//     return (
//         <footer className="bg-gray-100 border-t mt-20">
//             <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6 }}
//                     className="text-center"
//                 >
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                         👨‍💻 About the Developer
//                     </h2>

//                     <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
//                         <img
//                             src={dev.imageSrc}
//                             alt={dev.name}
//                             className="w-32 h-32 rounded-full object-cover shadow-md"
//                         />
//                         <div className="text-center sm:text-left">
//                             <h3 className="text-xl font-semibold text-indigo-700">{dev.name}</h3>
//                             <p className="text-gray-600 mb-2">{dev.title}</p>

//                             <div className="flex justify-center sm:justify-start gap-4 mb-3">
//                                 <IconLink
//                                     href={`https://wa.me/${dev.contactNumber}`}
//                                     icon={<i className="fab fa-whatsapp text-2xl"></i>}
//                                     label="WhatsApp"
//                                 />
//                                 <IconLink
//                                     href={`mailto:${dev.email}`}
//                                     icon={<i className="fas fa-envelope text-2xl"></i>}
//                                     label="Email"
//                                 />
//                                 <IconLink
//                                     href={dev.facebookLink}
//                                     icon={<i className="fab fa-facebook text-2xl"></i>}
//                                     label="Facebook"
//                                 />
//                                 <IconLink
//                                     href={dev.instagramLink}
//                                     icon={<i className="fab fa-instagram text-2xl"></i>}
//                                     label="Instagram"
//                                 />
//                                 <IconLink
//                                     href={dev.youtubeLink}
//                                     icon={<i className="fab fa-youtube text-2xl"></i>}
//                                     label="YouTube"
//                                 />
//                             </div>

//                             <div className="mt-4">
//                                 <p className="font-medium text-gray-700 mb-1">Skills:</p>
//                                 <div className="flex flex-wrap justify-center sm:justify-start gap-2">
//                                     {dev.skills.map((skill, i) => (
//                                         <span
//                                             key={i}
//                                             className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full"
//                                         >
//                                             {skill}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <p className="mt-10 text-gray-500 text-sm">
//                         © {new Date().getFullYear()} LGOOG Computer Institute. Developed by{' '}
//                         <span className="font-semibold text-indigo-700">{dev.name}</span>.
//                     </p>
//                 </motion.div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Developer {
    id: number;
    name: string;
    title: string;
    imageSrc: string;
    skills: string[];
    services: string[];
    contactNumber: string;
    email: string;
    youtubeLink: string;
    facebookLink: string;
    instagramLink: string;
}

const developers: Developer[] = [
    {
        id: 1,
        name: 'Pradum Shukla',
        title: 'Full-Stack Web Developer',
        imageSrc: '/assets/developer/pradum-shukla.jpeg',
        skills: [
            'React', 'Next.js', 'Angular', 'TypeScript', 'Node.js', 'Express.js',
            'MongoDB', 'MySQL', 'Redis', 'TailwindCSS', 'GSAP', 'Framer Motion'
        ],
        services: [
            'Custom Web Apps', 'API Integration', 'Responsive Design', 'Database Design',
            'Performance Optimization', 'UI/UX Implementation'
        ],
        contactNumber: '918188898587',
        email: 'pradumshukla1133@gmail.com',
        youtubeLink: 'https://www.youtube.com/channel/UCiK5k3hOoDZInVnFYT1u12A',
        facebookLink: 'https://www.facebook.com/pradum.shukla.146?mibextid=ZbWKwL',
        instagramLink: 'https://www.instagram.com/mr_pradum_shukla?igsh=aXFyc2RkYjlpOXdw',
    },
];

// Icon Link Component
const IconLink = ({ href, icon, label, colorClass }: { href: string; icon: ReactNode; label: string; colorClass: string }) => (
    <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className={`${colorClass} text-2xl transition-transform transform hover:scale-110`}
    >
        {icon}
    </a>
);

const Footer = () => {
    const dev = developers[0];

    return (
        <footer className="bg-gray-100 border-t mt-20">
            <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        👨‍💻 About the Developer
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <img
                            src={dev.imageSrc}
                            alt={dev.name}
                            className="w-32 h-32 rounded-full object-cover shadow-md"
                        />
                        <div className="text-center sm:text-left">
                            <h3 className="text-xl font-semibold text-indigo-700">{dev.name}</h3>
                            <p className="text-gray-600 mb-2">{dev.title}</p>

                            <div className="flex justify-center sm:justify-start gap-5 mb-4">
                                <IconLink
                                    href={`https://wa.me/${dev.contactNumber}`}
                                    icon={<i className="fab fa-whatsapp"></i>}
                                    label="WhatsApp"
                                    colorClass="text-green-500 hover:text-green-600"
                                />
                                <IconLink
                                    href={`mailto:${dev.email}`}
                                    icon={<i className="fas fa-envelope"></i>}
                                    label="Email"
                                    colorClass="text-red-500 hover:text-red-600"
                                />
                                <IconLink
                                    href={dev.facebookLink}
                                    icon={<i className="fab fa-facebook"></i>}
                                    label="Facebook"
                                    colorClass="text-blue-600 hover:text-blue-700"
                                />
                                <IconLink
                                    href={dev.instagramLink}
                                    icon={<i className="fab fa-instagram"></i>}
                                    label="Instagram"
                                    colorClass="text-pink-500 hover:text-pink-600"
                                />
                                <IconLink
                                    href={dev.youtubeLink}
                                    icon={<i className="fab fa-youtube"></i>}
                                    label="YouTube"
                                    colorClass="text-red-600 hover:text-red-700"
                                />
                            </div>

                            <div className="mt-4">
                                <p className="font-medium text-gray-700 mb-1">Skills:</p>
                                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                    {dev.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="mt-10 text-gray-500 text-sm">
                        © {new Date().getFullYear()} Hindi Tech Siksha Computer Institute. Developed by{' '}
                        <span className="font-semibold text-indigo-700">{dev.name}</span>.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
