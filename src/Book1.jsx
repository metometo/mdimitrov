import { useEffect, useState } from "react";
import { app, auth, db } from "./Firestore";
import { getAuth, signInAnonymously } from "firebase/auth/cordova";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { addDoc, collection, serverTimestamp } from "firebase/firestore/lite";
import { SendEmail } from "./SendMail";
import { Helmet, HelmetProvider } from 'react-helmet-async';


export function Book1()
{
	let [nameError, setNameError] = useState(false);
	let [phoneError, setPhoneError] = useState(false);
	let [addressError, setAddressError] = useState(false);

	let [orderNumber, setOrderNumber] = useState(1);
	let [visibleBookCoverImage, setVisibleBookCoverImage] = useState('cover.png');
	let [visibleBookCover, setVisibleBookCover] = useState('front');
		
	let [isOpen, setIsOpen] = useState(false);
	let[curVisiblePage, setCurVisiblePage] = useState(0);

	useEffect(()=>{

		if(isOpen==true)
		{
			document.getElementById('modalImg').src = "\\images\\" + images[curVisiblePage];			
		}

	},[isOpen, curVisiblePage]);

	useEffect(()=>{
						async function singInFirestore() 
						{
							const auth2 = getAuth(app);
							// 3. Активиране на App Check (защита от ботове)
							// Замени 'YOUR_RECAPTCHA_SITE_KEY' с ключа от Google reCAPTCHA
							self.FIREBASE_APPCHECK_DEBUG_TOKEN = true; // Използвай това само по време на разработка
							initializeAppCheck(app, {
								provider: new ReCaptchaV3Provider('6Ld0D9AsAAAAAKWgrLeKry6rFUYjkQaO7rjkS14h'),
								isTokenAutoRefreshEnabled: true
							});

							// 4. Анонимно вписване веднага след зареждане
							signInAnonymously(auth2)
								.then(() => console.log("Вписан сте анонимно!"))
								.catch((error) => console.error("Грешка при вход:", error));
							

							
						}

						singInFirestore();
		
		
					// .then(() => console.log("Вписан сте анонимно!"))
					// .catch((error) => console.error("Грешка при вход:", error));
				},[]);

	function switchCover(side) {
		side==='front' ? setVisibleBookCoverImage('cover.png') : setVisibleBookCoverImage('back_cover.png');
		
		setVisibleBookCover(side);
	}

	function toggleOrderForm() {
		document.getElementById('orderFormSection').style.display = 'block';
		document.getElementById('orderFormSectionMessage').style.display = 'none';
		document.getElementById('gallery').style.display = 'none';

		window.location.hash = 'orderFormSection';
		document.getElementById('name').focus();
	}

	function closeForm()
	{
		document.getElementById('orderFormSection').style.display = 'none';
		document.getElementById('orderFormSectionMessage').style.display = 'none';
		document.getElementById('gallery').style.display = 'block';
		window.location.hash = '';

		// reset form
		document.getElementById('name').value = "";
		document.getElementById('phone').value = "";
		document.getElementById('address').value = "";

		setPhoneError(false);
		setNameError(false);
		setAddressError(false);

		setOrderNumber(1);
	}

	async function submitOrder(e) {
		
		// check required
		let name = document.getElementById('name').value;
		if(name==="")
		{
			setNameError(true);
			
		}
		else
			setNameError(false);

		let phone = document.getElementById('phone').value;
		if(phone==="")
		{
			setPhoneError(true);
			
		}
		else
			setPhoneError(false);


		let address = document.getElementById('address').value;
		
		if(address==="")
		{
			setAddressError(true);
			
		}
		else
			setAddressError(false);

		if(name==="" || phone==="" || address==="")
			return;

		//e.preventDefault();
		
		const orderData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
				quantity: document.getElementById('quantity').value,
                timeStamp: serverTimestamp() // Добавя сървърно време на поръчката
        };

		// reset form
		document.getElementById('name').value = "";
		document.getElementById('phone').value = "";
		document.getElementById('address').value = "";
		setOrderNumber(1);      

		document.getElementById('orderFormSection').style.display = 'none';
		document.getElementById('orderFormSectionMessage').style.display = 'block';

            try {
                const docRef = await addDoc(collection(db, "orders"), orderData);

				// send notification email
				let emailStaatus = SendEmail();

				if(emailStaatus==false)
				{
					document.getElementById('orderFormSectionMessage').innerHTML = "<div className='text-center py-5'><h2 className='text-error'>❌ Възникна грешка.</p></div>";
					return;
				}

				document.getElementById('orderFormSectionMessage').innerHTML = "<div className='text-center py-5'><h2 className='text-success'>✅ Поръчка е приета!</h2><p>Ще се свържем с Вас за потвърждение.</p></div>";
            }
			catch (error) {
                document.getElementById('orderFormSectionMessage').innerHTML = "<div className='text-center py-5'><h2 className='text-error'>❌ Възникна грешка.</p></div>";
			}
	}

	const images = ["1.png", "2.png", "3.png", "4.png"];
	let currentIdx = 0;
	//const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));

	function openGallery(img) {
		setCurVisiblePage(img);	
		setIsOpen(true);
		
		//galleryModal.show();
	}

	function changeSlide(step) {
		if(curVisiblePage+step>=0 && curVisiblePage+step<=3)
			setCurVisiblePage(()=>curVisiblePage+step);		
	}

	return <>
			<HelmetProvider>
				<div>
					<Helmet>				
					<title>Горски приключения - Детска книжка от Методи Димитров</title>
					<meta name="description" content="Открийте магията на 'Горски приключения' от Методи Димитров. Вълшебни истории за деца, които учат на доброта, приятелство и ценности. Поръчайте онлайн!" />
					<meta name="keywords" content="Горски приключения, Методи Димитров, детска книжка, детски приказки, приказки за лека нощ, поръчка на книга" />
					<meta name="author" content="Методи Димитров" />
					<meta name="robots" content="index, follow" />

					<meta property="og:type" content="book"/ >
					<meta property="og:url" content="https://www.mdimitrov.com/books/ForestAdventures" />
					<meta property="og:title" content="Горски приключения" />
					<meta property="og:description" content="Вълшебни и поучителни приказки за деца от Методи Димитров. Разгледайте книгата онлайн!" />
					<meta property="og:image" content="https://www.mdimitrov.com/cover.png" />
					
					<link rel="canonical" href="https://www.mdimitrov.com/books/ForestAdventures" />

				</Helmet>
			</div>
			</HelmetProvider>

			{/* Секция Книги (Твоят дизайн за книгата) */}
			<section id="books" className="py-5">
				<div className="container">
					<div className="row align-items-center">
						{/* Изображение на книгата */}
						<div className="col-md-5 mb-5 mb-md-0 text-center">
							<div className="book-wrapper">
								<img id="mainCover" src={"\\images\\"+visibleBookCoverImage} className="img-fluid real-book-frame" alt="Горски приказки"/>
							</div>
							<div className="mt-3">
								<div className="btn-group shadow-sm">
									{visibleBookCover=="front"?<button className="btn btn-outline-secondary active" id="btnFront" onClick={()=>switchCover('front')}>Предна</button>:
									<button className="btn btn-outline-secondary" id="btnFront" onClick={()=>switchCover('front')}>Предна</button>
									}

									{visibleBookCover=="back"?<button className="btn btn-outline-secondary active" id="btnBack" onClick={()=>switchCover('back')}>Задна</button>:
										<button className="btn btn-outline-secondary" id="btnBack" onClick={()=>switchCover('back')}>Задна</button>
									}
								</div>
							</div>
						</div>

						{/* Детайли за книгата */}
						<div className="col-md-7 ps-md-5">
							<h2 className="display-5 fw-bold">Горски приключения</h2>
							<p className="fs-5">
								<span className="text-muted mb-7" style={{fontStyle:"italic"}}>Потопете се в свят на доброта</span>						
								&nbsp; &nbsp; В тази книжка ще откриете няколко топли и поучителни приказки, които по нежен и достъпен начин запознават децата 
								с важни добродетели. <br/>
								&nbsp; &nbsp; Малките читатели ще научат колко ценно е да си помагаме, да казваме истината и да пазим чистотата около себе си. 
								Ще открият какво представлява вътрешната красота и колко е важно да се споделя. Ще научат и за вълшебните думички и колко хубаво и важно е да ги използваме. 

							</p>

							<ul className="list-group list-group-flush bg-transparent my-4">
								<li className="list-group-item bg-transparent border-warning-subtle">Корица: мека</li>
								<li className="list-group-item bg-transparent border-warning-subtle">Брой страници: 86</li>
								<li className="list-group-item bg-transparent border-warning-subtle">ISBN: 978-619-7767-46</li>
								<li className="list-group-item bg-transparent border-warning-subtle">Година на издаване: 2026</li>
							</ul>

							<div className="d-flex align-items-center gap-3 flex-wrap">
								<span id="priceLabel" className="fs-2 fw-bold text-danger">5.00 евро</span>
								<button className="btn btn-pastel btn-lg" onClick={()=>toggleOrderForm()}>Поръчай</button>
							</div>

							{/* Електронна книга */}
							<div className="ebook-section">
								<div className="fw-bold mb-2">📱 Свали безплатно:</div>
								<div className="d-flex gap-2">
									<a href="https://metometo.github.io/mdimitrov/public/ebooks/Горски-приключения.pdf" className="btn-download btn-pdf" download>PDF версия</a>
									<a href="https://metometo.github.io/mdimitrov/public/ebooks/Горски-приключения.epub" className="btn-download btn-epub" download>EPUB версия</a>
									<a href="https://metometo.github.io/mdimitrov/public/ebooks/Горски-приключения.mobi" className="btn-download btn-mobi" download>MOBI версия</a>								
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Галерия */}
			<section className="container my-5" id="gallery">
				<h3 className="text-center mb-4">Разгърнете страниците</h3>
				<div className="row g-3">
					<div className="col-6 col-md-3"><img src="\images\1.png" className="gallery-img" onClick={()=>openGallery(0)}/></div>
					<div className="col-6 col-md-3"><img src="\images\2.png" className="gallery-img" onClick={()=>openGallery(1)}/></div>
					<div className="col-6 col-md-3"><img src="\images\3.png" className="gallery-img" onClick={()=>openGallery(2)}/></div>
					<div className="col-6 col-md-3"><img src="\images\4.png" className="gallery-img" onClick={()=>openGallery(3)}/></div>
				</div>
			</section>

			{/* Форма за поръчка */}
			<section id="orderFormSection" className="container my-5">
				<button  className="close-button2"   onClick={() => closeForm()}>X</button>
				<h3 className="text-center mb-4">Форма за поръчка</h3>
				
					<div className="row g-3">
						<div className="col-md-12" style={{color:nameError?"red":"black"}}>Вашето име {nameError?"(полето е задължително)":""}<input type="text" className="form-control" id="name" style={{background:nameError?"#f2bebe":"white"}}/></div> <br/>
						<div className="col-md-12" style={{color:phoneError?"red":"black"}}>Телефон {phoneError?"(полето е задължително)":""}<input type="tel" className="form-control" id="phone" style={{background:phoneError?"#f2bebe":"white"}} /></div><br/>
						<div className="col-12" style={{color:addressError?"red":"black"}}>Адрес {addressError?"(полето е задължително)":""}<textarea className="form-control" id="address" style={{background:addressError?"#f2bebe":"white"}} ></textarea>
							<div style={{color:"black"}}>Забележка: За доставка се начисляват допълнителни такси, които се заплащат на куриера .</div>
						</div><br/>
						<div className="col-12">Брой<input type="number" id="quantity" className="form-control" min="1" max="100" value={orderNumber}
							onChange={e => setOrderNumber(e.target.value)}/></div><br/>
						<div className="col-12 text-center">
							<button type="button" onClick={()=>submitOrder()} className="btn btn-success btn-lg px-5 rounded-pill">Потвърди поръчката</button>
						</div>
					</div>
				
			</section>

			<section id="orderFormSectionMessage" className="container my-5">			
			</section>

			
			{/* Модален прозорец за галерия */}
			
			{isOpen === true ? 
				<div className="backtop" id="galleryModal" tabIndex="-1" >
					<div className="modal-dialog2 modal-dialog-centered2 modal-lg2">
						<div className="dialog">
							<img id="modalImg" src="\images\1.png" className="img-fluid rounded shadow-lg"/>
							<button  className="close-button"   onClick={() => setIsOpen(false)}>X</button>
							<div className="mt-3">
								<button className="btn btn-light rounded-pill px-4" onClick={()=>changeSlide(-1)}>❮</button>
								<button className="btn btn-light rounded-pill px-4" onClick={()=>changeSlide(1)}>❯</button>
								
							</div>
						</div>
					</div>
				</div> : ""
			}
			
		</>   
}