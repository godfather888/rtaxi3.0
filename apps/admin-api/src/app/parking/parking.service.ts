import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkSpotEntity } from '@ridy/database';
import { Repository } from 'typeorm';
import { ParkSpotFilterInput } from './dto/park-shop-filter.input';
import { ParkSpotVehicleType } from '@ridy/database';
import { CreateParkSpotInput } from './dto/create-park-spot.input';
import { ParkSpotDTO } from './dto/park-spot.dto';
import { CustomerEntity } from '@ridy/database';
import { RegionService } from '@ridy/database';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(ParkSpotEntity)
    private parkSpotRepository: Repository<ParkSpotEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    private readonly regionService: RegionService,
  ) {}

  async getSpots({
    point,
    maximumDistance,
    minimumRating,
    facilities,
    vehicleType,
    parkingType,
  }: ParkSpotFilterInput): Promise<ParkSpotEntity[]> {
    const query = this.parkSpotRepository.createQueryBuilder('spot');
    query.where(
      'ST_Distance(spot.location, ST_GeomFromText(:point)) < :distance',
      {
        point: `POINT(${point.lng} ${point.lat})`,
        distance: maximumDistance ?? 1000,
      },
    );
    if (minimumRating != null) {
      query.andWhere('spot.rating >= :rating', { rating: minimumRating });
    }
    if (facilities != null && facilities.length > 0) {
      query.andWhere('spot.facilities @> :facilities', { facilities });
    }
    if (vehicleType != null) {
      switch (vehicleType) {
        case ParkSpotVehicleType.Car:
          query.andWhere('spot.carSpaces > 0');
          break;
        case ParkSpotVehicleType.Bike:
          query.andWhere('spot.bikeSpaces > 0');
          break;
        case ParkSpotVehicleType.Truck:
          query.andWhere('spot.truckSpaces > 0');
          break;
      }
    }
    if (parkingType != null) {
      query.andWhere('spot.parkingType = :parkingType', { parkingType });
    }
    return query.getMany();
  }

  async createSpot(input: CreateParkSpotInput): Promise<ParkSpotDTO> {
    const region = await this.regionService.getRegionWithPoint(input.location);
    if (region == null || region.length == 0) {
      throw new Error('Region not found');
    }
    let customer = await this.customerRepository.findOneBy({
      mobileNumber: input.ownerPhoneNumber,
    });
    if (customer == null) {
      customer = this.customerRepository.create({
        firstName: input.ownerFirstName,
        lastName: input.ownerLastName,
        email: input.ownerEmail,
        mobileNumber: input.ownerPhoneNumber,
        gender: input.ownerGender,
      });
      customer = await this.customerRepository.save(customer);
    }
    const parkSpot = this.parkSpotRepository.create({
      type: input.type,
      name: input.name,
      location: input.location,
      address: input.address,
      phoneNumber: input.phoneNumber,
      carSpaces: input.carSpaces,
      carPrice: input.carPrice,
      bikeSpaces: input.bikeSpaces,
      bikePrice: input.bikePrice,
      truckSpaces: input.truckSpaces,
      truckPrice: input.truckPrice,
      description: input.description,
      facilities: input.facilities,
      ownerId: customer.id,
      currency: region[0].currency,
      images: input.imageIds?.map((id) => ({ id })),
    });
    return this.parkSpotRepository.save(parkSpot);
  }
}
