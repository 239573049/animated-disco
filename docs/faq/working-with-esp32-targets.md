# 使用ESP32目标进行工作

## ESP32 Dev Kit C是唯一与nanoFramework兼容的板版本吗？

当前我们提供的ESP32 Dev Kit C映像适用于所有使用ESP32-Wroom-32x或ESP32-WROVER模块的ESP32板，包括ESP32-WROOM-32、ESP32-WROOM-32D、ESP32-WROOM-32U、ESP32-SOLO-1、ESP32-WROVER-B、ESP32-WROVER-IB等。SOLO模块只有一个核心，目前无法工作，因为我们在第二个核心上启动nanoCLR。

## 我可以使用Smart Config配置我的ESP32设备吗？

是的，您可以！当设备首次启动且没有设置无线SSID时，Smart Config会自动启动，即当设备首次刷写时。

要配置设备，请使用手机上的Smart Config应用程序之一，例如ESP8266 SmartConfig、Android上的DHC SmartConfig应用程序以及iOS上的EspressiF ESpTouch。

将手机连接到Wi-Fi访问点，运行Smart Config应用程序，该应用程序将提示您输入AP密码。然后将详细信息发送到设备。设备保存详细信息并连接到AP点。连接后，它会将连接状态确认回传给手机。

下次设备重新启动时，设备会自动连接到AP，因为Wi-Fi详细信息已保存。

有关更多信息，请参阅[此处](https://www.switchdoc.com/2018/06/tutorial-esp32-bc24-provisioning-for-wifi)。

在您的应用程序中，您可以等待网络配置/连接，方法是等待IP设置。

```csharp
static void WaitIP()
{
    Console.WriteLine("等待IP");
    while (true)
    {
        NetworkInterface ni = NetworkInterface.GetAllNetworkInterfaces()[0];
        if (ni.IPv4Address != null && ni.IPv4Address.Length > 0)
        {
            if (ni.IPv4Address[0] != '0')
            {
                Console.WriteLine("获得IP " + ni.IPv4Address);
                break;
            }
        }
        Thread.Sleep(1000);
    }
}
```

## 我可以在Visual Studio上调试ESP32上的nanoCLR代码，无需特殊硬件吗？

是的，您可以！按照[此处](../building/build-esp32.md#debugging-nanoclr-without-special-hardware)描述的老式步骤操作。

## 如何解码“Guru Meditation Error”输出？

我们在这方面提供了一个VS Code任务来帮助您。如果您已安装我们为VS Code提供的任务模板，您可以在名称为“Decode ESP32 back trace”的任务下找到它。以下是如何使用它的[博客文章](https://jsimoesblog.wordpress.com/2022/11/04/decoding-esp32-back-trace/)。