# 💀 Universal DDoS Tool 💀 Made By NightAbyss

![Demo](demo.gif)

**Advanced multi-vector DDoS attack framework with Scapy. Penetration testing only.**

## 🚀 Features
- **Dynamic target** - Any domain/IP via user input
- **5 attack vectors** - SYN/UDP/HTTP/DNS/Slowloris
- **Customizable** - Threads, ports, duration
- **Real-time stats** - Packets/sec counter
- **Thread pooling** - 1000+ concurrent attacks
- **Auto IP resolution** - Works with domains

## 📋 Prerequisites
```bash
sudo apt update
sudo apt install python3-scapy python3-pip tcpdump hping3 -y

```
## 📁 Repository Structure

DDOS_ATTACKS/
├── DDOS.py               # Main attack script
├── README.md             # This file
├── requirements.txt      # Dependencies
├── demo.gif              # (Optional demo)
├── LICENSE               # MIT License
└── .gitignore            # Ignore junk

## ⚙️ Usage

git clone https://github.com/codewithfitse/CYBERCODES
cd DDOS_ATTACKS
sudo apt install python3-scapy -y OR pip3 install -r requirements.txt
sudo python3 DDOS.py

# Interactive setup:

💀 UNIVERSAL SCAPY DDoS TOOL 💀
🎯 Enter target domain/IP: example.com
🔌 Enter port (80/443): 80  
⚡ Threads (50): 200
⏱️ Duration minutes: 10

# 🎮 Demo Output

🚀 ATTACKING target.com (93.184.216.34:80)
💥 200 THREADS LAUNCHED!
🔥 SYN FLOOD ACTIVE
💣 UDP FLOOD ACTIVE
🌐 HTTP GET FLOOD
🌩️ DNS AMPLIFICATION
🐌 SLOWLORIS ACTIVE
💀 FLOODING | Threads: 200 | PPS: 187,423

## 🔍 Monitoring Targets

# HTTP status + response time
watch "curl -s -w '%{http_code} %{time_total}s\n' http://target.com"

# Network traffic

sudo tcpdump -i any host target.com

# Server load (if access)

watch "netstat -ant | grep :80 | wc -l"

## ⚠️ Legal & Ethical Use

✅ Penetration testing on YOUR systems
✅ Security research in controlled labs  
✅ CTF competitions
✅ Red team engagements (with permission)

❌ Production systems without authorization
❌ Competitors or third parties
❌ Any illegal activity

## 📈 Performance

Threads: 50   → 50k pps → Small sites down
Threads: 200  → 200k pps → Medium sites struggle
Threads: 1000 → 1M+ pps  → Enterprise mitigation needed

