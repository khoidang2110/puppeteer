import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  InternalServerErrorException,
} from '@nestjs/common';
import { ExampleService } from '@src/alpha/example/example.service';
import { CreateExampleDto } from '@src/alpha/example/dto/create-example.dto';
import { UpdateExampleDto } from '@src/alpha/example/dto/update-example.dto';
import { Response } from 'express';
import puppeteer from 'puppeteer';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  create(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto);
  }

  @Get('/testt')
  async convertToBase64(
    @Query() { name, position, type = 'thanks', hr, location, time }: any,
    @Res() res: Response,
  ) {
    const listInfoHr = [
      { name: 'Nguyễn Thùy Dương', phone: '0395749382' },
      { name: 'Đỗ Thị Cẩm Tú', phone: '0937005115' },
      { name: 'Đỗ Thảo Linh', phone: '0833700052' },
    ];
    const currentHr = listInfoHr.find((it) => hr.includes(it.name));
    const textThanks = `\n    <!DOCTYPE html>\n    <html lang="vi">\n    <head>\n        <meta charset="UTF-8">\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n        <title>Thư cảm ơn ứng viên</title>\n        <style>\n          body {\n              font-family: Arial, sans-serif;\n              line-height: 1.6;\n              color: #333;\n              margin: 0;\n              padding: 20px;\n              background-color: #f9f9f9;\n          }\n          .email-container {\n              width: 100%;\n              max-width: 600px;\n              margin: 0 auto;\n              padding: 20px;\n              border: 1px solid #ddd;\n              border-radius: 8px;\n              background-color: #fff;\n          }\n          .email-header {\n              text-align: center;\n              margin-bottom: 20px;\n              color: #0056b3;\n          }\n          .email-footer {\n              text-align: center;\n              margin-top: 30px;\n              font-size: 0.9em;\n              color: #888;\n          }\n        </style>\n    </head>\n    <body>\n        <div class="email-container">\n            <h2 class="email-header">Thư Cảm Ơn</h2>\n            <p>Xin chào Anh/Chị ${name},</p>\n            <p>CÔNG TY CỔ PHẦN DƯỢC PHẨM NORWAY PHARMATECH AS chân thành cảm ơn Anh/Chị đã nộp đơn ứng tuyển vào vị trí <strong>${position}</strong> của Công ty.</p>\n            <p>Chúng tôi đã tiếp nhận hồ sơ ứng tuyển và đang trong quá trình đánh giá hồ sơ. Kết quả vòng hồ sơ sẽ được phản hồi lại Anh/Chị trong thời gian sớm nhất.</p>\n            <p>Chúc Anh/Chị một ngày tốt lành và đừng quên kiểm tra email thường xuyên nhé!</p>\n            <p>Chúng tôi rất mong sẽ có cơ hội cộng tác cùng Anh/Chị.</p>\n            <p>Trân trọng,</p>\n            <p>Đội ngũ Tuyển dụng</p>\n            <div class="email-footer">\n                <p>CÔNG TY CỔ PHẦN DƯỢC PHẨM NORWAY PHARMATECH AS</p>\n                <p>Email: contact@pharmatech.com | Điện thoại: (012) 345-6789</p>\n            </div>\n        </div>\n    </body>\n    </html>\n  `;
    const textInterview = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thư Mời Phỏng Vấn</title>
        <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 20px;
              background-color: #f9f9f9;
          }
          .email-container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
              background-color: #fff;
          }
          .email-header {
              text-align: center;
              margin-bottom: 20px;
              color: #0056b3;
          }
          .email-footer {
              text-align: center;
              margin-top: 30px;
              font-size: 0.9em;
              color: #888;
          }
        </style>
    </head>
    <body>
        <div class="email-container">
            <h2 class="email-header">Thư Mời Phỏng Vấn</h2>
            <p>Kính gửi: Anh/ Chị ${name},</p>
            <p>Lời đầu tiên, chúng tôi xin cảm ơn Anh/ Chị vì đã quan tâm đến vị trí <strong>${position}</strong> của Công ty Pharmatech. Thông qua hồ sơ mà Anh/ Chị đã gửi về, chúng tôi nhận thấy Anh/Chị có kiến thức chuyên môn phù hợp với vị trí mà chúng tôi đang tuyển.</p>
            <p>Phòng Tuyển dụng trân trọng mời Anh/ Chị đến tham gia phỏng vấn tại Công ty chúng tôi, thông tin cụ thể như sau:</p>
            <ul>
                <li><strong>Vị trí tuyển dụng:</strong> ${position}</li>
                <li><strong>Thời gian:</strong> ${time}</li>
                <li><strong>Địa điểm:</strong> ${location}</li>
                <li><strong>Liên hệ:</strong> ${currentHr.name} - Đt/Zalo: ${currentHr.phone} để được hỗ trợ.</li>
            </ul>
            <p><strong>LƯU Ý:</strong></p>
            <ul>
                <li>Anh/ Chị vui lòng phản hồi email này về việc xác nhận tham dự phỏng vấn và đến trước giờ hẹn 10 - 15 phút để nhân sự hỗ trợ sắp xếp phỏng vấn chu đáo hơn.</li>
                <li>Trường hợp Anh/ Chị có phản hồi khác về thời gian phỏng vấn hoặc có bất kỳ thắc mắc nào về phía Công ty, hãy liên hệ theo số điện thoại phía trên hoặc phản hồi kèm theo thư này.</li>
            </ul>
            <p>Cám ơn Anh/ Chị đã quan tâm đến thông tin tuyển dụng của chúng tôi.</p>
            <p>Trân trọng,</p>
            <p>Thanks and Best Regards,</p>
            <p>-------------------------------------</p>
        </div>
    </body>
    </html>
  `;
    const content = () => {
      switch (type) {
        case 'thanks':
          return textThanks;
        case 'interview':
          return textInterview;

        default:
          return textThanks;
      }
    };
    console.log('content()', content());

    try {
      const browser = await puppeteer.launch({
        // headless: true,
         executablePath: `/usr/bin/google-chrome`,
        // args: [`--no-sandbox`, `--headless`, `--disable-gpu`, `--disable-dev-shm-usage`],
      });

      const page = await browser.newPage();

      await page.setContent(content());

      const pdfBuffer = await page.pdf({ format: 'A4' });

      await browser.close();

      // Đặt tiêu đề Content-Type cho PDF
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${`${name} ${position}` || 'document'}.pdf"`,
      });

      // Stream file PDF ra response
      res.send(Buffer.from(pdfBuffer));
    } catch (error) {
      console.log('Failed to create PDF', error);

      throw new InternalServerErrorException('Failed to create PDF');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exampleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExampleDto: UpdateExampleDto) {
    return this.exampleService.update(+id, updateExampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exampleService.remove(+id);
  }
}
