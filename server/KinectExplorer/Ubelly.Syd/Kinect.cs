using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Windows;
using System.Windows.Media.Imaging;
using System.Threading.Tasks;
using Microsoft.Kinect;
using Fleck;
using System.IO;

namespace Ubelly.Syd
{
    public class Kinect
    {
        public static WebSocketServer server;
        public static List<IWebSocketConnection> allSockets;
        public static WriteableBitmap imageData;
        public static byte[] pixelData;

        public static void init()
        {
            FleckLog.Level = LogLevel.Debug;
            allSockets = new List<IWebSocketConnection>();
            server = new WebSocketServer("ws://localhost:1337");
            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Console.WriteLine("Open!");
                    allSockets.Add(socket);
                };
                socket.OnClose = () =>
                {
                    Console.WriteLine("Close!");
                    allSockets.Remove(socket);
                };
                socket.OnMessage = message =>
                {
                    Console.WriteLine(message);
                    if (message == "SENDMEANIMAGE")
                    {
                        Kinect.sendImage();
                    }
                };
            });
        }

        public static void sendImage()
        {
            string filename = @"C:\\dev\\testKinect\\realValtestColor4.bmp";

         

            string json = "{\"image\":\""+filename+"\"}";
            Kinect.broadcast(json);
        }

        public static void broadcast(string msg)
        {
            //Console.WriteLine(msg);
            if (allSockets.Count > 0)
            {
                try
                {
                    allSockets.ToList().ForEach(s => s.Send(msg));
                }
                catch (Exception e)
                {
                
                }
            }
            
        }
    }
}
