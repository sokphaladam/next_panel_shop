"use client";
import { useMemo, useCallback, useEffect, useState } from "react";

export default function SocketPage() {
  const ip = "192.168.137.1";
  const port = "8080";
  const [value, setValue] = useState<any>({
    name: "",
    addon: "",
    remark: "",
    delivery: "",
    table: "",
    key: "",
  });

  const socket = useMemo(() => {
    return new WebSocket(`ws://${ip}:${port}`);
  }, []);

  // useEffect(() => {
  //   return () => {
  //     if (socket.readyState === WebSocket.OPEN) {
  //       socket.close();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    socket.onopen = () => {
      console.log("connection");
    };
  }, []);

  console.log(socket.readyState);

  const onSend = useCallback(() => {
    // const socket = new WebSocket(`ws://${ip}:${port}`);

    socket.send(JSON.stringify(value));
  }, [value, socket]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {Object.keys(value).map((x) => {
          return (
            <div key={x}>
              <label htmlFor="">{x}</label>
              <input
                type="text"
                value={value[x]}
                key={x}
                onChange={(e) =>
                  setValue({
                    ...value,
                    [x]: e.target.value,
                  })
                }
              />
            </div>
          );
        })}
      </div>
      <button onClick={onSend}>Send</button>
    </div>
  );
}
