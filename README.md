# IoT/ MQTT Protocol
![mqtt.js](https://www.hivemq.com/wp-content/uploads/Screen-Shot-2014-10-22-at-12.21.07.png)
=======
MQTT (Message Queuing Telemetry Transport) là giao thức truyền message theo mô hình publish/subcribe. Nó dựa trên một Broker (điểm trung gian) "nhẹ" (khá ít xử lý), và được thiết kế có tính mở (tức là không đăng trưng cho ứng dụng cụ thể nào), đơn giản, nhẹ, và dễ triển khai. 



 Kiến trúc mức cao (high-level) của MQTT gồm 2 phần chính là Broker và Clients.
![mqtt.js](http://thinkpalm.com/wp-content/uploads/2017/03/MQTT-High-Level-Architecture-1.png)
=======
Trong đó, broker được coi như trung tâm, nó là điểm giao của tất cả các kết nối đến từ client. Nhiệm vụ chính của broker là nhận mesage từ publisher, xếp các message theo hàng đợi rồi chuyển chúng tới một địa chỉ cụ thể. Nhiệm vụ phụ của broker là nó có thể đảm nhận thêm một vài tính năng liên quan tới quá trình truyền thông như: bảo mật message, lưu trữ message, logs,...

Client thì được chia thành 2 nhóm là publisher và subscriber. Client là các software components hoạt động tại edge device  nên chúng được thiết kế để có thể hoạt động một cách linh hoạt (lightweight). Client chỉ làm ít nhất một trong 2 việc là publish các message lên một topic cụ thể hoặc subscribe một topic nào đó để nhận message từ topic này.

MQTT Clients tương thích với hầu hết các nền tảng hệ điều hành hiện có: MAC OS, Windows, LInux, Androids, iOS...

#### Các đặc trưng của giao thức:

##### -> Có 3 cấp độ của QoS (Qualities of Service) được đưa ra:
 + QoS-0: là mức đảm bảo thấp nhất, tất cả các message có QoS 0 sau khi được gửi đi bởi publisher sẽ không được kiểm tra xem đã đến broker hay chưa (fire - and - forget)

 + QoS-1: message được đảm bảo rằng đã đến nơi nhận ít nhất 1 lần (tức là sự trùng lặp vẫn có thể xảy ra)

 + QoS-2: đây là mức đảm bảo cao nhất, broker sẽ đảm bảo các message có QoS-2 sẽ đến nơi nhận chỉ 1 lần duy nhất, không trùng lặp, không thất lạc. Tất nhiên việc xác nhận với QoS-2 sẽ tốn băng thông hơn 2 cách còn lại.




# Server

Website server (Website Controller): 
```
https://hercules2404.github.io/IoT/ 
```

MQTT server (MQTT Broker) - hosted message for devices connections: 
```
https://www.cloudmqtt.com/
```




# Date publish

December 2017



# Contact with us
```
Gmail: ducduc08@gmail.com
```


# License

Please do not edit this source and do not use as economical purpose. Thank you!

