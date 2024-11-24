import type { Schema, Struct } from '@strapi/strapi';

export interface VideoCourseCourseInclude extends Struct.ComponentSchema {
  collectionName: 'components_video_course_course_includes';
  info: {
    displayName: 'courseInclude';
  };
  attributes: {
    course: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'video-course.course-include': VideoCourseCourseInclude;
    }
  }
}
