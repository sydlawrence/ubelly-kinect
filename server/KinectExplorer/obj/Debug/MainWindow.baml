   M S B A M L   `   `   `  ����I  EKinectExplorer, Version=0.0.0.0, Culture=neutral, PublicKeyToken=nulla5clr-namespace:Microsoft.Samples.Kinect.KinectExplorer'Microsoft.Samples.Kinect.KinectExplorer  5   	   8    2Microsoft.Samples.Kinect.KinectExplorer.MainWindow   5   	   W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   Cl5clr-namespace:Microsoft.Samples.Kinect.KinectExplorer     5   	   -   5          � Icon$  KinectExplorer.ico��5   	    � Title$ Kinect Explorer - Console��6#    � SizeToContent$ WidthAndHeight=�5   	   
 � Top$ 0��6(    � Left$ 0��60    � 	Resources 5       �� DataType>   8Microsoft.Samples.Kinect.KinectExplorer.KinectSensorItemA   ;Microsoft.Samples.Kinect.KinectExplorer.VisibilityConverter   VisibilityConverter��%�   (��       5	      *, +)&	  �     �� 6
   "  6   .R�5
      �� .+�5      �� $��Images\KinectSensor.png��6   $	��100��69   �� 5      ��6   �� *Status+5      5        5   
   6    5      .��5      � -   5        
������  � RowDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $��* �6   .+�5   
   �� -   5        $��insertKinectSensor��5      $	��400��6/   $��0��6;   .+�5      �� $��20q�6   $%��Images\RequiresKinectSensor.png��6    $	��160��5      $��Center=�6    �� 5      $��24(�6   $��Italic$�6&   $
��Wrap=�5      $��Center=�5      97Please insert a Kinect for Windows Sensor into your PC.�� 5   I   �� 5       -   5        $3��-http://go.microsoft.com/fwlink/?LinkID=239809?�5       .�5!   ;   
More info.6G   5"      5#      �� 5$   
   -   5        $��kinectSensors��5&      
�������$��20q�5%      $��0��5&   '   y�5'      ��  �� ElementName$ kinectSensors��	 �� Path$	 Items.Count�
 �� 	Converter#
 [  5(      �� 5)   
   -   5        $��sensorStatusChanges��5*      {�.  $��1��5)   $   $	��300��61   5*      5+      5,      