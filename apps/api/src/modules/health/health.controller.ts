import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @Public()
  @ApiOperation({ summary: 'System health check' })
  @ApiResponse({
    status: 200,
    description: 'API is running and accessible',
    schema: {
      example: {
        success: true,
        message: 'KajLagbe API is running',
        timestamp: '2026-09-03T12:00:00.000Z',
      },
    },
  })
  check() {
    return {
      success: true,
      message: 'KajLagbe API is running',
      timestamp: new Date().toISOString(),
    };
  }
}

