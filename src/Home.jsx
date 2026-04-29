import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home()
{
	
	return <span>
		

		{/* Секция Начало */}
		<section id="home" className="hero-intro">
			<div className="container">
				<h1 className="display-7 fw-bold mb-3">Добре дошли на mdimitrov.com!</h1>
				<p className="lead mx-auto" style={{maxWidth: "700px"}}>
					Това е официалният сайт на Методи Димитров.<br/> 
					Тук ще намерите различни произведения и материали.

				</p>
				<div className="mt-4">
					<Link to="/book" className="btn-pastel" style={{background:"#5aa9aa"}}>Разгледай моите книги</Link>
				</div>
			</div>

			<br/><br/><br/><br/><br/><br/><br/><br/>
		</section>

		
	</span>
}