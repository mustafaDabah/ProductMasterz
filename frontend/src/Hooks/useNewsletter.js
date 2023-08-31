import { BASIC_URL } from '@/utils/basicURL';
import axios from 'axios';
import { toast } from 'react-toastify';

function useNewsletter(formRef) {

    const addNewSubscription = (event) => {
      event.preventDefault();
  
      const inputsValue = new FormData(event.currentTarget);
      const values = Object.fromEntries(inputsValue.entries());
      const {userEmail , userName} = values  

      const lastEmailSent = localStorage.getItem(`lastEmailSent_${userEmail}`);
  
      if (lastEmailSent && (new Date() - new Date(lastEmailSent)) < 7 * 24 * 60 * 60 * 1000) {
        toast.error('You have already received the newsletter within this email.');
        return;
      }
  
      axios.post(`${BASIC_URL}/customersEmails`, { fields: {
          userName,
          userEmail,
          newsLetterSubscribed:true
        }} , { headers: {"Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`}})
        .then(response => {
          toast.success('Subscription successful');
          localStorage.setItem(`lastEmailSent_${userEmail}`, new Date().toISOString());
          formRef.current.reset();
        })
        .catch(error => {
          toast.error(error);
        });
    };

    return addNewSubscription
}

export default useNewsletter