import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

export function Contacts()
{
	
	return <>
			
			{/* Head meta data */}
			<>			
				<title>mdimitrov.com - Контакти</title>
				<meta name="description" content="Контакти - Официална страница на Методи Димитров." />
				<meta name="keywords" content="Методи Димитров, официална, страница, контакти" />
				<meta name="author" content="Методи Димитров" />
				<meta name="robots" content="index, follow" />

				<meta property="og:type" content="website"/ >
				<meta property="og:url" content="https://mdimitrov.com/contacts" />
				<meta property="og:title" content="mdimitrov.com - Контакти" />
				<meta property="og:description" content="Контакти - Официална страница на Методи Димитров." />
				
				<link rel="canonical" href="https://www.mdimitrov.com/contacts" />
			</>

			{/* Секция Начало */}
			<section id="home" className="hero-intro">
				<div className="container">
					<h1 className="display-7 fw-bold mb-3">Имейл адреси за контакт:</h1>
					<p className="lead mx-auto">
						&nbsp;
					</p>
					<p className="lead mx-auto">
						contact@mdimitrov.com
					</p>

					<p className="lead mx-auto">
						stories.by.metodi.dimitrov@gmail.com
					</p>
					<br/><br/><br/><br/><br/><br/><br/><br/>
				</div>
			</section>

			
		</>
}