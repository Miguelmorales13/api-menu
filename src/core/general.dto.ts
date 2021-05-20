import { ApiProperty } from '@nestjs/swagger';

export class General {
  @ApiProperty({
    description: 'This property is unique to identify the data',
  })
  id?: number;

  @ApiProperty({ description: 'This property marks the date of creation' })
  createdAt?: number;

  @ApiProperty({ description: 'This property marks the last update date' })
  updatedAt?: number;
}

export class ErrorResponse {
  @ApiProperty({
    description: 'This property indicates the error code',
    example: 500,
  })
  code: number;

  @ApiProperty({
    description: 'This property tells you how much it was',
    example: new Date(),
  })
  timestamps: Date;

  @ApiProperty({
    description: 'This property tells you the route you used',
    example: '/',
  })
  path: string;

  @ApiProperty({
    description:
      'This property tells you the method you used "GET","POST","PUT","DELETE"',
    example: 'GET',
  })
  method: string;

  @ApiProperty({
    description:
      'this property is the message that the server is returning to you',
    example: 'Error',
  })
  message: string;
}
