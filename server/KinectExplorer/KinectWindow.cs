//------------------------------------------------------------------------------
// <copyright file="KinectWindow.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//------------------------------------------------------------------------------

namespace Microsoft.Samples.Kinect.KinectExplorer
{
    using System.Windows;
    using System;
    using Microsoft.Kinect;
    using Microsoft.Samples.Kinect.WpfViewers;
    using Ubelly.Syd;

    /// <summary>
    /// This is the core kinect window.
    /// </summary>
    public class KinectWindow : Window
    {
        #region Private state
        private readonly KinectDiagnosticViewer kinectDiagnosticViewer;
        private KinectSensor kinect;
        #endregion Private state

        public KinectWindow()
        {
            this.kinectDiagnosticViewer = new KinectDiagnosticViewer();
            this.kinectDiagnosticViewer.KinectColorViewer.CollectFrameRate = true;
            this.kinectDiagnosticViewer.KinectDepthViewer.CollectFrameRate = true;
            Content = this.kinectDiagnosticViewer;
            Width = 1024;
            Height = 600;
            Title = "Kinect Explorer";
            this.Closed += this.KinectWindowClosed;
            Ubelly.Syd.Kinect.init();
            
        }

        public KinectSensor Kinect
        {
            get
            {
                return this.kinect;
            }

            set
            {
                this.kinect = value;
                this.kinectDiagnosticViewer.Kinect = this.kinect;
            }
        }

        public void StatusChanged()
        {
            this.kinectDiagnosticViewer.StatusChanged();
        }

        private void KinectWindowClosed(object sender, System.EventArgs e)
        {
            // KinectDiagnosticViewer will call kinectSensor.Stop() so we properly release its use.
            this.Kinect = null;
        }
    }
}
