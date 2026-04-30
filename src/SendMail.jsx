import { EmailJSResponseStatus } from "@emailjs/browser";


export function SendEmail()
{
	// code fragment
	var data = {
		service_id: 'service_fu884zd',
		template_id: 'a1337qd',
		user_id: 'PoKD5ztEMxr3BqrIV',
		template_params: {
		
		}
	};

	async function sendEMailData()
	{
		try{
			const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
											method: "POST",
											headers: {
												"Content-Type": "application/json",
											},
											body: JSON.stringify(data), 
										});
			return true;
		}
		catch(e)
		{
			console.log(e);
			return false;
		}
	}

	return sendEMailData();
}