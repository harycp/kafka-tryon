
#### A. Pengantar Belajar Kafka

- **PRC** : semacam metode protokol untuk komunikasi dari satu aplikasi ke aplikasi yang lain, contohnya seperti RESTful API.
- **Publish Subscribe** : mekanisme lain dari komunikasi antar aplikasi, yang biasanya disebut *Messaging*, penerima tidak langsung berhubungan dengan pengirim tetapi memiliki perantara (Broker).
- **Message Broker** : Ini adalah maksud dari Publish Subscribe, jadi penerima data akan mengambil atau dikirim datanya melalui si Message Broker ini, bukan dari si pengirimnya langsung.
- **Sejenisnya** : RabbitMQ, Kafka, BullMQ, dan lain lain.

#### B. Kafka

- Aplikasi *Message Broker* yang mengusung konsep *distributed commit log* atau *distributed streaming platform* yang artinya *append only* atau hanya bisa ditambah dan akan disimpan di paling akhir.
- Dibuat menggunakan bahasa Java, jadi harus install java dulu di environment.

#### C. Topic
- **Pengertian** : Seperti table dalam database, jadi saat mengirim data maka kita itu harus mengirimkan ke topic terlebih dahulu.
- **Cara membuat** : dengan menggunakan file `bin/windows/kafka-topic.sh` atau `bin/kafka-topic.sh` untuk linux / macOS
- **Script** : `.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --create --topic helloworld` 
- **Script Melihat Topic** : `.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --list`
- **Script Menghapus Topic** : `.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --delete --topic helloworld` 

#### D. Message
- **Pengertian** : Seperti Row dalam tabel di database, data yang dikirimkan ke database (Topic).
- **Struktur Message** : 
	1. Topic : nama topic untuk simpan message
	2. Partition : nomor partisinya
	3. Header : Informasi tambahan untuk message
	4. Key : id untuk message, bukan PK karena id disini boleh sama antar message.
	5. Value : isi data untuk messagenya.
- **Script Send Message** : `.\bin\windows\kafka-console-producer.bat --bootstrap-server localhost:9092 --topic helloworld`

#### E. Producer
- Pengertian : Si pengirim data message ke Kafka.
- Contoh : Ada User Service, mengirim data message ke Topic User. Berarti si User Service inilah producernya.

#### F. Consumer
- **Pengertian**: Aplikasi untuk membaca dan menerima data message dari kafka.
- Akan berurut membacanya, dimulai dari paling depan sampai paling akhir.
- **Script Console Message** : `.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic helloworld --from-beginning`

#### G. Consumer Group
- Hanya akan ada 1 consumer yang menerima data di 1 group.
- Sebaiknya dibuat sebelum melakukan consume, karena saat consumer membaca data dari topic, si consumer ini harus menentukan consumer group mana yang digunakan.
- Yang tidak dibuat dulu akan di generate otomatis oleh Kafka.
- **Jika Consumer Group tidak dibuat** : 
	1. Akan selalu dibuat lagi dan lagi oleh kafka.
	2. Dapat menimbulkan konflik jika server server yang menerima data dari topic yang sama karena menggunakan consumer group yang berbeda beda (otomatis data yang diterima akan tidak realtime dan tidak berhubungan dengan topic sumbernya).
- **Jika Consumer Group dibuat** : 
	Data yang dikirimkan dari topic akan sama, hanya mengirim sekali untuk digunakan di server server penerimanya.
- **Script Code** : `.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic belajarkafka --group belajarkafkagroup --from-beginning`

#### H. Offset
- **Pengertian** : Informasi data terakhir yang disimpan oleh kafka.
- Misal kita consumer menerima from beginning dan terhenti di data ke 10, ya berarti offsetnya adalah 10.
- Informasi offset ini disimpan pada *consumer group* bukan pada masing masing consumer.
- **From Beginning** : awalnya consumer akan menampilkan semua data, lalu jika kita matikan dan kita kirim data baru, maka consumer akan membaca data dari data terakhir yang telah dibaca.
- **Tanpa From Beginning** : awalnya consumer hanya membaca data terbaru, yang baru saja dikirimkan, jika dimatikan, maka saat di jalankan kembali ia akan membaca dari data yang terakhir di baca.
- **Cek informasi offset terakhir pada sebuah consumer group** : `.\bin\windows\kafka-consumer-groups.bat --bootstrap-server localhost:9092 --all-groups --all-topics --describe` 

#### I. Partition
- **Pengertian** : Seperti sub materi ulangan yang berbeda di satu kelas dan sama di tiap tiap kelas.
- 1 Partisi hanya bisa diisi oleh 1 consumer, tetapi 1 consumer bisa memiliki lebih dari 1 partisi.
- **Script Code** : 
	1. Topic baru : `.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --create --topic helloworld --partitions 3`
	2. Topic Existing : `.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --alter --topic belajarkafka --partitions 3`
	3. Melihat detail : `.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --describe --topic belajarkafka`
- Cara memnentukan Partition yang digunakan untuk menyimpan data adalah dengan menentukan *key* nya pada message yang dikirim.

#### I. Routing
- Untuk menentukan suatu message akan masuk ke partition yang mana.
- Logic kafka dalam menentukan partition dari message kita adalah seperti ini :
	`hash(message.key)%2`
	contoh : message dengan key 'mantap', jumlah partitionnya itu ada 2.
	misalnya hash(mantap) itu = 10. maka 10%2 =  0. Nah nanti message itu akan masuk ke partition 0.
- **Script code :** `.\bin\windows\kafka-console-producer.bat --bootstrap-server localhost:9092 --topic belajarkafka --property "parse.key=true" --property "key.seperator=:"` 
- Untuk melihat key yang ada di message : 
	`.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic belajarkafka --group belajarkafkagroup --from-beginning --property "print.key=true"` 
	
