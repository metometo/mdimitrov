import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

export function Home()
{
	
	return <>
			<HelmetProvider>
				<div>
					<Helmet>				
						<title>mdimitrov.com - Официална страница на Методи Димитров</title>
						<meta name="description" content="Официална страница на Методи Димитров." />
						<meta name="keywords" content="Методи Димитров, официална, страница" />
						<meta name="author" content="Методи Димитров" />
						<meta name="robots" content="index, follow" />

						<meta property="og:type" content="website"/ >
						<meta property="og:url" content="https://mdimitrov.com/" />
						<meta property="og:title" content="mdimitrov.com - Официална страница на Методи Димитров" />
						<meta property="og:description" content="Официална страница на Методи Димитров." />
						
						<link rel="canonical" href="https://www.mdimitrov.com/" />
					</Helmet>
				</div>
			</HelmetProvider>

			{/* Секция Начало */}
			<section id="home" className="hero-intro">
				<div className="container">
					<h1 className="display-7 fw-bold mb-3">Добре дошли на mdimitrov.com!</h1>
					<p className="lead mx-auto" style={{maxWidth: "700px"}}>
						Това е официалният сайт на Методи Димитров.<br/> 
						Тук ще намерите различни произведения и материали.

					</p>
					<div className="mt-4">
						<Link to="/books/ForestAdventures" className="btn-pastel" style={{background:"#5aa9aa"}}>Разгледай моите книги</Link>
					</div>
				</div>

				<br/><br/><br/><br/><br/><br/><br/><br/>
			</section>
	</>
}