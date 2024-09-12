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
    @Query()
    {
      phone,
      salary,
      probationSalary,
      workingPlace,
      timeStart,
      email,
      workingPart,
      name,
      position,
      // type = 'thanks',
      hr,
      // location,
      // time,
      workingTime,
    }: any,
    @Res() res: Response,
  ) {
    // const listInfoHr = [
    //   { name: 'Nguyễn Thùy Dương', phone: '0395749382' },
    //   { name: 'Đỗ Thị Cẩm Tú', phone: '0937005115' },
    //   { name: 'Đỗ Thảo Linh', phone: '0833700052' },
    // ];
    // const currentHr = listInfoHr.find((it) => hr.includes(it.name));
    const textSuccess = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thư Mời Nhận Việc</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
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
        .header, .footer {
            margin-bottom: 20px;
        }
        .date {
            text-align: right;
            font-weight: bold;
        }
        .content {
            margin-bottom: 30px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            padding: 8px;
            text-align: left;
            vertical-align: top;
        }
        .bordered-table, .bordered-table th, .bordered-table td {
            border: 1px solid black;
        }
        .no-border {
            border: none;
        }
        .confirmation-section {
            border: 1px solid black;
            background-color: #f0f0f0;
            padding: 10px;
        }
        .company-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .company-logo {
            max-width: 200px;
            height: auto;
        }
        .national-title {
            text-align: right;
            font-weight: bold;
        }
        .bg-gray {
            
            background-color: #e0e0e0;
        }

        .no-wrap {
          white-space: nowrap;
      }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header company-info">
            <img src="https://pharmatech-website.s3.ap-southeast-2.amazonaws.com/PMT+Logo+400x96.png" alt="Logo Pharmatech" class="company-logo">
            <div class="national-title">
             
            <span>CỘNG HÒA XÃ HỘI
                CHỦ NGHĨA
                VIỆT NAM  </span></br>
                Độc lập – Tự do – Hạnh phúc
            </div>
        </div>

        <!-- Date -->
        <p class="date">
            TPHCM, ${timeStart}
        </p>

        <!-- Content -->
        <div class="content">
            <h2 class="email-header">THƯ MỜI NHẬN VIỆC</h2>
            <p><strong>Kính gửi: Anh/Chị: ${name}</strong></p>
            <p>Email: ${email}</p>
            <p>Số điện thoại: ${phone}</p>
            <p>CÔNG TY CỔ PHẦN DƯỢC PHẨM NORWAY PHARMATECH AS chân thành cảm ơn Anh/Chị đã quan tâm đến nhu cầu tuyển dụng và đã dành thời gian tiếp xúc, trao đổi với chúng tôi trong thời gian qua. Theo kết quả phỏng vấn, chúng tôi trân trọng mời Anh/Chị về cộng tác với chúng tôi, nội dung như sau:</p>
        </div>

        <!-- Job Details Table -->
        <table class="bordered-table">
            <tr>
                <th >Chức danh</th>
                <td>${position}</td>
            </tr>
            <tr>
                <th class='no-wrap'><span>Bộ phận/đơn vị làm việc</span></th>
                <td>${workingPart}</td>
            </tr>
            <tr>
                <th class='no-wrap'>Ngày bắt đầu nhận việc</th>
                <td>${timeStart}</td>
            </tr>
            <tr>
                <th class='no-wrap'>Địa điểm làm việc</th>
                <td>${workingPlace}. (Hoặc theo sự sắp xếp phù hợp của Công ty)</td>
            </tr>
            <tr>
                <th class='no-wrap'>Thời giờ làm việc</th>
                <td>${workingTime}; (Hoặc theo sự sắp xếp phù hợp của Công ty)</td>
            </tr>
            <tr>
                <th class='no-wrap'>Thời gian thử việc</th>
                <td>02 tháng</td>
            </tr>
            <tr>
                <th class='no-wrap'>Lương thử việc</th>
                <td>${probationSalary} đ/ tháng</td>
            </tr>
            <tr>
                <th class='no-wrap'>Lương chính thức</th>
                <td>${salary} đ/ tháng</td>
            </tr>
            <tr>
                <th class='no-wrap'>Phụ cấp giữ xe</th>
                <td>Theo chế độ phúc lợi của Công ty.</td>
            </tr>
            <tr>
                <th class='no-wrap'>Các chế độ phúc lợi khác</th>
                <td>Theo quy định chung của Công ty.</td>
            </tr>
        </table>

        <!-- Footer -->
        <div class="footer">
            <table class="no-border">
                <tr>
                    <td>
                        <strong>Nơi nhận:</strong><br>
                        - Như trên;<br>
                        - Lưu P.HCNS
                    </td>
                    <td class="no-border" style="text-align: center;">
                        <strong>TUQ. GIÁM ĐỐC</strong><br><br><br><br>
                        PHẠM THỊ HẠNH
                    </td>
                </tr>
            </table>
            <table class="bordered-table">
                <tr>
                    <td class='bg-gray'><strong class='bg-gray'>Ứng viên xác nhận</strong></td>
                    <td><strong>Ký tên</strong></td>
                </tr>
                <tr>
                    <td>
                        □ Tôi đồng ý nhận việc theo thư mời trên.<br>
                        □ Ý kiến khác: …………………………
                    </td>
                    <td></td>
                </tr>
            </table>
        </div>

        <!-- Email Footer -->
        <div class="email-footer">
            <p>Chúng tôi mong muốn nhận được sự hợp tác từ Anh/Chị.</p>
        </div>
    </div>
</body>
</html>
`;
    try {
      const browser = await puppeteer.launch({
        //  executablePath: `/usr/bin/google-chrome`,
        //  headless: true ,
        //  args: [  '--no-sandbox',
        //   '--disable-setuid-sandbox',
        //   '--disable-gpu'],
        //  ignoreDefaultArgs: ['--disable-extensions']
      });

      const page = await browser.newPage();

      await page.setContent(textSuccess);

      const pdfBuffer = await page.pdf();

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
