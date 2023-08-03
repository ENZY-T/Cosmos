//Avatar Imports
import imgFoodProc from '../img/Avatars/FoodProcessingEng.jpg'
import img3dDesignEng from '../img/Avatars/3dDesignEng.jpg'
import imgIotEng from '../img/Avatars/IotEng.jpg'
import imgEngSpclProj from '../img/Avatars/Engineer_Special_proj.jpg'
import imgAssistEng from '../img/Avatars/AssistantEng.jpg'

export let serverUrl = ''
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    serverUrl = 'http://localhost:5000'
} else {
    // production code
    serverUrl = 'https://cosmos.lk'
}

export const globalSettings = {
    isPurchaseOpen: false,
}

//Details
export const contactDetails = {
    tele: '+94 76 569 4999',
    email: 'info@cosmos.lk',
    tele2: '',
    email2: '',
    addressRegOffice: {
        entity: 'Regional Office',
        street: ' No. 370, Orex City',
        city: ' Ekala',
        district: ' Ja-ela',
        country: ' Sri Lanka',
    },
    addressLab: {
        entity: 'Laboratory',
        street: ' Yatiwala',
        city: ' Mawathagama',
        district: '',
        country: '',
    },
}

export const socialLinks = {
    fb: 'https://www.facebook.com/COSMOSASPL',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
}

export const teamCrew = [
    // {
    //   name: 'A.P.M. Dassanayake',
    //   position: 'CEO',
    //   avatar: imgCeo,
    //   twitter: 'https://twitter.com/MadusankaDassa1?s=20',
    //   fb: ''
    // },
    // {
    //     name: 'C. Prasad',
    //     position: 'Site Engineer',
    //     avatar: imgSiteEng,
    // },
    {
        name: 'Gihan Akila',
        position: 'Engineer - Special project',
        avatar: imgEngSpclProj,
    },
    {
        name: 'N. Ariyarathne',
        position: 'Food Processing Engineer',
        avatar: imgFoodProc,
    },
    {
        name: 'Y. Amarasinghe',
        position: '3D design Engineer',
        avatar: img3dDesignEng,
    },
    {
        name: 'U. Weerasekara',
        position: 'IOT Engineer (Undergraduate)',
        avatar: imgIotEng,
        twitter: 'https://twitter.com/UmeshanUC',
        fb: 'https://www.facebook.com/umeshan.weerasekara',
        linkedin: 'https://www.linkedin.com/in/umeshan-weerasekara/',
    },
    {
        name: 'Bhagya Gunarathna',
        position: 'Assistant Engineer',
        avatar: imgAssistEng,
    },
]

export const globalCosmos = {
    services: [
        'Modern Automation Equipment Solutions',
        'HMI Controllers and Visualizations',
        'Machine Designing And Fabrication on Requirement',
        'SCADA Systems',
        'Agricultural Machinery Solutions',
        'Wireless Control And Data Acquisition Systems',
        'Home Automation And Smart Home Control Systems',
        'Automation of Manual Machines',
    ],
}
