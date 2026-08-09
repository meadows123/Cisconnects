---
title: "How to Plan a Business WiFi Installation: A Step-by-Step Guide"
slug: how-to-plan-business-wifi-installation
date: "2026-05-16"
isoDate: "2026-05-16T00:00:00Z"
category: "WiFi Solutions"
author: "Conxiea"
excerpt: "Most business WiFi problems are planning problems. Before a single cable is run or access point mounted, these are the steps that determine whether your network performs or frustrates. Here's how to plan a business WiFi installation properly."
description: "Most business WiFi problems are planning problems. Before a single cable is run or access point mounted, these are the steps that determine whether your network performs or frustrates. Here's how to plan a business WiFi installation properly."
readTime: "10 min read"
keywords:
  - how to plan business wifi installation
  - business wifi installation planning
  - wifi site survey business
  - access point placement office
  - wireless network design business
  - office wifi planning guide
  - business wifi design
  - commercial wifi planning
---

**[→ Book a Free Business WiFi Site Survey](https://conxiea.com/office-connectivity)**

---

# How to Plan a Business WiFi Installation: A Step-by-Step Guide

Most business WiFi problems aren't hardware problems. They're planning problems.

The access point mounted in the wrong place. The number of APs specced for an empty building, not one full of people and devices. The channel configuration that made sense at install time but created interference as the surrounding area filled up with wireless networks. The VLAN design that looked good on paper but left a security gap your IT auditor later found.

All of these are decisions made, or not made, before a single cable is run. Get the planning right and the installation almost takes care of itself. Skip it, and you'll be troubleshooting the consequences for years.

This guide walks through every stage of planning a business WiFi installation properly, in the order that actually matters.

---

![Engineer conducting a wireless site survey in a commercial office space](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=628&fit=crop)

---

## Step 1: Define What Your Network Actually Needs to Do

Before thinking about hardware or coverage, you need to be clear about the demands your network will face. The answers change everything downstream.

Work through these questions honestly:

**How many devices will be connected simultaneously?**
Count devices, not people. Most staff members now have a laptop, a phone, and often a tablet. Add printers, VoIP handsets, CCTV cameras, smart TVs in meeting rooms, any IoT devices, and guest devices. The number is almost always higher than businesses initially estimate.

**What applications will run over WiFi?**
Video conferencing (Teams, Zoom, Google Meet) and VoIP telephony are the most bandwidth-sensitive and latency-intolerant applications most businesses run. If these need to work reliably, your network needs to be planned around them, not treated as an afterthought.

**Are there areas with specific requirements?**
Meeting rooms typically concentrate the most demanding use (multiple video calls, screen sharing, heavy download). Reception areas often need guest network access. Warehouses need coverage across large open spaces. Server rooms need wired priority, not WiFi. Map your space by use case, not just by square footage.

**What are your security requirements?**
Do you process payment card data (PCI DSS compliance)? Handle patient information (NHS or DSPT standards)? Have client confidentiality obligations? These requirements translate directly into network segmentation and security policy decisions that need to be made at the design stage, not retrofitted later.

**Do you need to support future growth?**
Planning a network for 20 people that you'll outgrow in 18 months is planning for a rip-and-replace. A little capacity headroom at design time costs far less than a premature upgrade.

---

## Step 2: Conduct a Proper Site Survey

The site survey is where planning becomes specific to your actual environment. This is the step most DIY and budget installations skip, and the step that causes the most problems.

### What a site survey assesses

**Building layout and dimensions:**
You need accurate floor plans, or measurements if plans don't exist. Multi-floor buildings need to be treated floor by floor, with attention to how signal propagates vertically (it does, through floors, in ways that affect channel planning).

**Building materials:**
This is where physics matters most. Different materials absorb and reflect WiFi signal in very different ways:

| Material | Effect on 2.4GHz Signal | Effect on 5GHz Signal |
|---|---|---|
| Drywall / plasterboard | Low attenuation | Low–moderate attenuation |
| Glass | Low attenuation | Low–moderate attenuation |
| Brick | Moderate attenuation | High attenuation |
| Concrete | High attenuation | Very high attenuation |
| Steel / metal | Very high attenuation / reflection | Near-total attenuation |

A building with concrete structural walls and steel partitions might need three times the number of access points compared to a similarly sized open-plan office with plasterboard partitions. The site survey identifies this before you spec hardware.

**User density and distribution:**
Where do people actually spend most of their time? An open-plan office with 40 desks concentrated in one area has very different requirements from 40 desks spread across two floors and multiple meeting rooms. Heat-mapping expected user density alongside the floor plan gives you the input you need to position APs correctly.

**Interference sources:**
Other wireless networks, microwave ovens, Bluetooth devices, wireless CCTV systems, and industrial equipment all generate RF interference that affects your WiFi performance. A pre-installation survey identifies interference sources so your design can account for them, choosing appropriate channels, frequencies, and AP placement to minimise their impact.

**Existing cabling infrastructure:**
Where does cabling already exist? Where will new cable runs be needed? Are there areas where running cabling will be complex or expensive (concrete floors, listed buildings, difficult ceiling voids)? Understanding this at the survey stage prevents surprises when installation begins.

### Active vs. passive site survey

A **passive survey** walks your space with a wireless analysis tool, measuring signal strength and interference from existing networks. It tells you what you're dealing with before any hardware is deployed.

An **active survey** deploys temporary access points and measures actual coverage and performance. This gives you validated data on how your planned AP placement will perform before any permanent installation happens.

For anything other than the simplest environments, an active survey is worth the additional time.

> For context on why this step can't be skipped: [Why Business WiFi Isn't Plug and Play, And What It Costs You When You Treat It Like It Is](/blog/why-business-wifi-isnt-plug-and-play)

---

## Step 3: Design Your Network Architecture

With your requirements defined and your survey complete, you can design the network.

### Access point placement

AP placement is the most consequential design decision. The principles:

**Coverage overlap, not gaps:**
Adjacent access points should overlap by 15–20% of their coverage area. This ensures seamless roaming, when a device moves between APs, it hands over cleanly to the next one without the connection dropping. Too little overlap creates dead zones. Too much overlap creates co-channel interference.

**Ceiling mounting over wall mounting:**
Ceiling-mounted APs broadcast a relatively even signal footprint in all horizontal directions. Wall-mounted APs broadcast unevenly, typically more useful for corridors than open spaces. Ceiling mounting is the default for most commercial environments.

**Height above head level:**
Mounting APs 2.5–4 metres above the floor provides good coverage footprint while minimising signal obstruction from people and furniture. Too high reduces useful signal at desk level. Too low creates more interference and covers less area.

**Away from interference sources:**
Keep APs away from microwaves, fluorescent lighting with electronic ballasts, and other wireless systems. The 20cm rule, keep at least 20cm between an AP and any metal structure, prevents reflections that degrade performance.

### Channel planning

The 2.4GHz band has three non-overlapping channels (1, 6, 11). The 5GHz band has many more. Adjacent access points should be assigned non-overlapping channels to avoid co-channel interference, the situation where two nearby APs on the same channel compete for airtime and degrade each other's performance.

In a dense deployment, this requires careful planning. In high-interference environments (urban offices surrounded by many neighbouring networks), 5GHz is often preferable because its greater channel availability reduces congestion, even though its range is shorter.

### Network segmentation (VLAN design)

Your network should carry multiple traffic types that need to be isolated from each other:

- **Staff corporate network**, access to internal systems, the internet, business applications
- **Guest / visitor network**, internet access only, isolated from all internal systems
- **IoT / devices network**, CCTV, smart devices, printers that don't need access to corporate systems
- **VoIP / telephony network**, often benefits from QoS prioritisation and separate VLAN for management

VLANs create logical separation across the physical infrastructure. Getting this right at design time costs very little. Retrofitting it later, or discovering you didn't have it when an auditor asks, costs considerably more.

### QoS planning

Quality of Service rules prioritise certain types of traffic over others when your network is under load. VoIP and video conferencing packets should be prioritised over file downloads and general browsing, because a dropped video call is immediately visible, while a slightly slower file download is not.

Configure QoS for your specific application mix, not a generic template.

---

## Step 4: Specify the Right Hardware

With the design complete, you can specify hardware with confidence, rather than buying what's available and hoping it fits.

### Access points

For most business environments, you're choosing between:

**[Cisco Meraki](https://meraki.cisco.com/products/wi-fi/)**, cloud-managed, excellent for organisations that want strong centralised management, visibility, and simplified administration. Licensing model means ongoing cost. Best-in-class management interface.

**[Ubiquiti UniFi](https://ui.com/wi-fi)**, strong hardware, on-premises or cloud management, more one-time cost than subscription. Good for organisations with in-house IT who want control without ongoing licensing.

**Aruba (HPE)**, enterprise positioning, strong in large or complex environments, particularly good for healthcare and regulated industries.

**Ruckus**, particularly strong RF performance in high-density environments. Excellent choice for venues, retail, or anywhere with many simultaneous devices.

### Switches

Every access point needs a switch port. Managed switches supporting **Power over Ethernet (PoE)** power the access points through the data cable, eliminating the need for separate power runs. Specify switches with enough PoE budget to power all connected APs, plus headroom for future expansion.

### Router and firewall

Your router and firewall control the boundary between your internal network and the internet. For most businesses, a dedicated firewall appliance (Cisco Meraki MX, Sophos XGS, Fortinet FortiGate, or similar) provides far better security controls and visibility than the ISP-supplied router.

---

## Step 5: Plan Your Cabling Infrastructure

Every access point, switch, and wired device needs a cable run. Plan these before installation begins.

**Cat6 or Cat6a** is the standard for new commercial installations in 2026. Cat6 supports 10Gbps over short runs; Cat6a supports 10Gbps to the full 100m cable limit. For future-proofing, Cat6a is worth the marginal additional cost in most environments.

Map cable routes on your floor plan, identifying where cables will run through ceiling voids, in trunking, or through conduit. Flag any areas where routing is complex (concrete floors, restricted ceiling access, listed building restrictions) so the installation team can plan accordingly.

A patch panel in your comms room or server cabinet organises all incoming cable runs and makes future moves, adds, and changes manageable. Don't skip this; it pays back every time you need to make a change.

---

## Step 6: Document the Design Before Installation Begins

A complete design document before installation begins is the difference between a manageable project and an improvised one.

Your design documentation should include:
- Floor plan with AP positions marked
- Cable route map
- Hardware schedule (make, model, and quantity of every component)
- VLAN and IP addressing scheme
- SSID list and security configuration
- QoS rules and priorities
- Handover checklist for testing and sign-off

This documentation becomes your reference for troubleshooting, future changes, and onboarding new IT staff. Installations done without it are much harder to manage and maintain.

---

**Need a professional team to handle the survey, design, and installation for you?**

At [Conxiea](https://conxiea.com/office-connectivity), we start every installation with a thorough site survey and produce a full network design before any work begins. No guesswork. No surprises after the cables are in.

**[→ Book Your Free WiFi Consultation](https://conxiea.com/office-connectivity)**

---

### Related Reading

- [Business WiFi Installation: The Complete Guide for UK Businesses (2026)](/blog/business-wifi-installation)
- [Business WiFi Installation Best Practices: What the Professionals Do Differently](/blog/business-wifi-best-practices)
- [Why Business WiFi Isn't Plug and Play, And What It Costs You When You Treat It Like It Is](/blog/why-business-wifi-isnt-plug-and-play)
- [Office WiFi Setup: Why Most Business Networks Fail (And How to Fix It)](/blog/office-wifi-setup)

### External Resources

- [Wi-Fi Alliance, Business Wireless](https://www.wi-fi.org/)
- [Cisco Meraki Access Points](https://meraki.cisco.com/products/wi-fi/)
- [Ubiquiti UniFi WiFi](https://ui.com/wi-fi)
- [NCSC, Securing Your Wireless Network](https://www.ncsc.gov.uk/guidance/securing-your-wireless-network)
- [Ekahau, Wireless Site Survey Tools](https://www.ekahau.com/)
