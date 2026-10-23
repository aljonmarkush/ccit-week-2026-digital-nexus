"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
const links = [{href:"/",label:"Home"},{href:"/events",label:"Events"},{href:"/schedule",label:"Schedule"},{href:"/groups",label:"Groups"},{href:"/leaderboard",label:"Leaderboard"},{href:"/ccit-night",label:"CCIT Night"}];
export default function Navbar(){ const [open,setOpen]=useState(false); return <header className="nav-wrap"><nav className="navbar container"><Link href="/" className="brand"><span className="brand-mark"><Image src="/images/ccit-logo.png" alt="CCIT sports and technology logo" width={42} height={58} priority /></span><span><b>CCIT<span className="lime"> WEEK</span></b><small> DIGITAL NEXUS · 2026</small></span></Link><div className="nav-links">{links.map(l=><Link key={l.href} href={l.href}>{l.label}</Link>)}</div><Link className="button button-lime nav-cta" href="/registration">Register <span>↗</span></Link><button className="menu-toggle" aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></nav>{open&&<div className="mobile-nav">{links.map(l=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)}>{l.label}</Link>)}<Link href="/registration" onClick={()=>setOpen(false)}>Register now ↗</Link></div>}</header> }
