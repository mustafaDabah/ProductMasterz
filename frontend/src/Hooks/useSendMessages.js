import axios from 'axios';
import { toast } from 'react-toastify';

const BASIC_URL = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_BASE_ID}`;

function useSendMessages() {

    const sendMessagesReceivers = async(event) => {
        event.preventDefault();

        const inputsValue = new FormData(event.target);
        const values = Object.fromEntries(inputsValue.entries());
        const {email , message  , subject , name} = values
        console.log(values)

        await axios.post(`${BASIC_URL}/customersEmails`, { fields: 
            {
              userName:name,
              userEmail: email,
              newsLetterSubscribed:false
            },
        }, {headers: {"Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`}})
        
        // send messages for receivers
        await axios.post(`/api/send-message`, {
            name,
            email,
            message,
            subject,
        }).then(res => {
            toast.success(res.data.message);
            console.log(res)
        })

    }

    return sendMessagesReceivers

}

export default useSendMessages