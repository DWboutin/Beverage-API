import Package from '../models/package';
import mongoose from 'mongoose';

class PackageCollection {

  insert(data) {
    let newPackage = new Package(data);

    return new Promise((fulfill, reject) => {
      newPackage.save((err, data) => {
        if (err) {
          reject(err);
        }

        fulfill(data);
      });

    });
  }

  find(data = {}) {
    return new Promise((fulfill, reject) => {

      Package.find(data, (err, results) => {
        if(err){
          reject(err);
        }

        fulfill(results);
      });

    });
  }
}

export default new PackageCollection();