// lib/redis.ts
import { createClient } from "redis";

const client = createClient({
  username: "default",
  password: "PIViYStQYFPiyFrK5WXLO4zEVYcOlgDJ",
  socket: {
    host: "redis-18190.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 18190,
  },
});

client.on("error", (err) => console.error("Redis error:", err));

if (!client.isOpen) {
  client.connect();
}

export default client;
