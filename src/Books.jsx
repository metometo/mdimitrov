import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Books()
{
	let [visibleBookCoverImage, setVisibleBookCoverImage] = useState('cover.png');
	let [visibleBookCover, setVisibleBookCover] = useState('front');
		
	let [isOpen, setIsOpen] = useState(false);
	let[curVisiblePage, setCurVisiblePage] = useState(0);

	useEffect(()=>{

		if(isOpen==true)
		{
			document.getElementById('modalImg').src = "images\\" + images[curVisiblePage];			
		}

	},[isOpen, curVisiblePage]);

	function switchCover(side) {
		side==='front' ? setVisibleBookCoverImage('cover.png') : setVisibleBookCoverImage('back_cover.png');
		
		setVisibleBookCover(side);
	}

	function toggleOrderForm() {
		document.getElementById('orderFormSection').style.display = 'block';
		window.location.hash = 'orderFormSection';
	}

	function submitOrder(e) {
		e.preventDefault();
		document.getElementById('orderFormSection').innerHTML = "<div className='text-center py-5'><h2 className='text-success'>✅ Поръчката е приета!</h2><p>Ще се свържем с Вас за потвърждение.</p></div>";
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

	return <span>
		

		{/* Секция Начало */}
		<section id="home" className="hero-intro">
			<div className="container">
				<h1 className="display-4 fw-bold mb-3">Добре дошли в моя свят!</h1>
				<p className="lead mx-auto" style={{maxWidth: "700px"}}>
					Това е официалният сайт на Методи Димитров — автор на детски книги и приказки. Тук ще намерите неговите произведения, вдъхновени от природата, доброто сърце и магията на детството. Всяка история е написана с любов, за да учи и вдъхновява малките читатели. 
				</p>
				<div className="mt-4">
					<a href="#books" className="btn-pastel">Разгледай моите книги</a>
				</div>
			</div>
		</section>

		{/* Секция Книги (Твоят дизайн за книгата) */}
		<section id="books" className="py-5">
			<div className="container">
				<div className="row align-items-center">
					{/* Изображение на книгата */}
					<div className="col-md-5 mb-5 mb-md-0 text-center">
						<div className="book-wrapper">
							<img id="mainCover" src={"images\\"+visibleBookCoverImage} className="img-fluid real-book-frame" alt="Горски приказки"/>
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
						<h2 className="display-5 fw-bold">Горски приказки</h2>
						<p className="text-muted italic mb-4">Най-новата ми творба за 2026 г.</p>
						<p className="fs-5">
							Потопете се в свят на доброта. Тази книжка разказва за важни добродетели – как да си помагаме, да казваме истината и да пазим природата. Идеална за четене преди сън!
						</p>

						<ul className="list-group list-group-flush bg-transparent my-4">
							<li className="list-group-item bg-transparent border-warning-subtle">Брой страници: 86</li>
							<li className="list-group-item bg-transparent border-warning-subtle">ISBN: 978-619-7767-46</li>
						</ul>

						<div className="d-flex align-items-center gap-3 flex-wrap">
							<span id="priceLabel" className="fs-2 fw-bold text-danger">5.00 €</span>
							<button className="btn btn-pastel btn-lg" onClick={()=>toggleOrderForm()}>Поръчай</button>
						</div>

						{/* Електронна книга */}
						<div className="ebook-section">
							<div className="fw-bold mb-2">📱 Свали безплатно:</div>
							<div className="d-flex gap-2">
								<a href="#" className="btn-download btn-pdf">PDF версия</a>
								<a href="#" className="btn-download btn-epub">EPUB версия</a>
								<a href="#" className="btn-download btn-mobi">MOBI версия</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		{/* Галерия */}
		<section className="container my-5">
			<h3 className="text-center mb-4">Разгърнете страниците</h3>
			<div className="row g-3">
				<div className="col-6 col-md-3"><img src="images\\1.png" className="gallery-img" onClick={()=>openGallery(0)}/></div>
				<div className="col-6 col-md-3"><img src="images\\2.png" className="gallery-img" onClick={()=>openGallery(1)}/></div>
				<div className="col-6 col-md-3"><img src="images\\3.png" className="gallery-img" onClick={()=>openGallery(2)}/></div>
				<div className="col-6 col-md-3"><img src="images\\4.png" className="gallery-img" onClick={()=>openGallery(3)}/></div>
			</div>
		</section>

		{/* Форма за поръчка */}
		<section id="orderFormSection" className="container my-5">
			<h3 className="text-center mb-4">Форма за доставка</h3>
			<form onSubmit={()=>submitOrder()}>
				<div className="row g-3">
					<div className="col-md-6"><input type="text" className="form-control" placeholder="Вашето име" required/></div>
					<div className="col-md-6"><input type="tel" className="form-control" placeholder="Телефон" required/></div>
					<div className="col-12"><textarea className="form-control" placeholder="Адрес за доставка (Еконт/Спиди)"></textarea></div>
					<div className="col-12 text-center">
						<button type="submit" className="btn btn-success btn-lg px-5 rounded-pill">Потвърди поръчката</button>
					</div>
				</div>
			</form>
		</section>

		{/* Контакти */}
		<footer id="contact">
			<div className="container text-center">
				<h3 className="mb-4">Свържете се с мен</h3>
				<p className="mb-1">📧 <a href="mailto:stories.by.metodi.dimitrov@gmail.com" className="text-decoration-none text-muted">stories.by.metodi.dimitrov@gmail.com</a></p>
				<p className="mb-4">📱 +359 888 000 000</p>
				<hr/>
				<p className="text-muted mt-4"><small>&copy; 2026 Методи Димитров. Всички права запазени.</small></p>
			</div>
		</footer>

		{/* Модален прозорец за галерия */}
		
		  {isOpen === true ? 
         <div className="backtop" id="galleryModal" tabIndex="-1" >
			<div className="modal-dialog2 modal-dialog-centered2 modal-lg2">
				<div className="dialog">
					<img id="modalImg" src="images\\1.jpg" className="img-fluid rounded shadow-lg"/>
					<button  className="close-button"   onClick={() => setIsOpen(false)}>X</button>
					<div className="mt-3">
						<button className="btn btn-light rounded-pill px-4" onClick={()=>changeSlide(-1)}>❮</button>
						<button className="btn btn-light rounded-pill px-4" onClick={()=>changeSlide(1)}>❯</button>
						 
					</div>
				</div>
			</div>
		</div> :
		<>dsds</>

      }
	</span>
}